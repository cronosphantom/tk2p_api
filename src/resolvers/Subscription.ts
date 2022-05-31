import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import { Subscription, Coach, User, Program } from "../models/";

import { ProgramInput } from "../inputs/ProgramInput";

import { getManager, Repository } from "typeorm";
import { nanoid } from "nanoid";
import {
  SubscriberRegistrationInput,
  SubscriptionInput,
} from "../inputs/Subscription";
import { workScheduler } from "../workers/queueScheduler";
import moment from "moment";

@Resolver((of) => Subscription)
export class SubscriptionResolver {
  constructor(private programRepo: Repository<Subscription>) {}

  @Query(() => Subscription)
  async coachSubscriptions(@Arg("coachId") id: number) {
    let subs: Subscription[] = await Subscription.find({
      where: { coach: { id } },
    });
    return subs;
  }

  @Mutation(() => Subscription)
  async updateSubscription(
    @Arg("data", () => ProgramInput) data: ProgramInput,
    @Arg("id") id: Number
  ): Promise<Subscription> {
    const obj: any = await Subscription.findOne({
      where: { id: id },
    });

    return await Subscription.save({
      ...obj,
      ...data,
    });
  }

  @Mutation(() => Subscription)
  async createSubscription(
    @Arg("data", () => SubscriptionInput) data: SubscriptionInput
  ): Promise<Subscription> {
    const user = (await User.findOne(data.userId)) || new User();
    const prg =
      (await Program.findOne(data.programId, {
        relations: ["programItems"],
      })) || new Program();
    let subscription = new Subscription();
    subscription.subscriber = user;
    subscription.program = prg;
    subscription.status = "active";
    subscription.save();

    // add a user's jobs to queue.
    // a job is a content item / program item to be sent to a user and the date its
    // scheduled to be delivered.
    // delivery date `runAt` depends on the value of `frequencyTime` & `frequency` for the program

    const firstRunAt = () => {
      const [minsToAdd, hourToAdd] = prg.frequencyTime.split(":");
      let startOn;
      if (prg.frequency == "daily") {
        startOn = moment().startOf("day");
      }
      if (prg.frequency == "weekly") {
        startOn = moment().startOf("week").add(prg.frequencyDetail, "days");
      }
      if (prg.frequency == "monthly") {
        startOn = moment().startOf("month").add(prg.frequencyDetail, "days");
      }
      return startOn ? startOn.add(minsToAdd, "minutes").add(hourToAdd, "hours") : moment();

    };

    // subsequent delivery day / time
    const afterFirstRunAt = (previousRunAt: moment.Moment) => {
      if (prg.frequency == "daily") {
        return previousRunAt.add(1, "days");
      }
      if (prg.frequency == "weekly") {
        return previousRunAt.add(prg.frequencyDetail, "days");
      }
      if (prg.frequency == "monthly") {
        return previousRunAt.add(prg.frequencyDetail, "days");
      }
      return moment();
    }

    let nextRunAt = firstRunAt();
    const {addJob} = await workScheduler();

    // @ts-ignore
    for (let i in prg.programItems.filter(item => item.contentType == 'Program Content')) {
      // @ts-ignore
      const item = prg.programItems[i];
      await addJob(
        "sendCuratedContent",
        {
          subscriptionId: subscription.id,
          programItemId: item.id,
          userId: user.id
        },
        {
          runAt: nextRunAt.toDate(),
        }
      );
      // reset nextRunAt to be x days ahead / from current nextRunAt
      nextRunAt = afterFirstRunAt(nextRunAt)
    }

    // send initial content now 
    // @ts-ignore
    const initialContent = prg.programItems.filter(item => item.contentType == 'Initial Content')[0]
    await addJob(
      "sendCuratedContent",
      {
        programItemId: initialContent.id
      },
      {
        runAt: moment().add(15, "seconds").toDate(),
      }
    );

    return subscription;
  }

  @Mutation(() => Subscription)
  async registerUserToSubscription(
    @Arg("data", () => SubscriberRegistrationInput)
    data: SubscriberRegistrationInput
  ): Promise<Subscription> {
    const user = new User();
    const prg =
      (await Program.find({
        relations: ["coach"],
        where: {
          code: data.code,
        },
      })) || new Program();
    if (!prg[0].id) {
      return new Subscription();
    }
    let obj = new Subscription();
    // save user details
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.mobile = data.mobile;
    await user.save();

    obj.subscriber = user;
    obj.program = prg[0];
    obj.status = "active";
    await obj.save();

    return obj;
  }

  @Mutation(() => Subscription)
  async deleteSubscription(@Arg("id", () => String) id: string) {
    const obj = await Subscription.findOne(id);
    await Subscription.delete(id);

    return obj;
  }
}
