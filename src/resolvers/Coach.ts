import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { Program, Coach } from "../models/";

import { ProgramInput } from "../inputs/ProgramInput";

import { getManager, Repository } from "typeorm";
import { nanoid } from "nanoid";
import { CoachInput } from "../inputs/Coach";
import { CoachLogoInput } from "../inputs/CoachLogoInput";
import { LinodeS3Upload } from "../utils/LinodeS3Upload";

@Resolver(of => Coach)
export class CoachResolver {
  constructor(private programRepo: Repository<Program>) {

  }

  @Query(() => [Coach])
  async coaches() {
    let coaches: Coach[] = await Coach.find();
    return coaches;
  }
  @Query(() => Coach)
  async coach(@Arg("id") id: string) {
    let res: Coach = await Coach.findOne(id, { relations: ['programs', 'programs.subscriptions'] }) || new Coach();
    return res;
  }
  @Mutation(() => Coach)
  async updateCoach(
    @Arg("data", () => CoachInput) data: CoachInput,
    @Arg("id") id: Number): Promise<Coach> {

    const coach: any = await Coach.findOne({
      where: { id: id }
    });

    const res = await Coach.save({
      ...coach,
      ...data
    });

    return res;
  }



  @Mutation(() => Coach)
  async createCoach(@Arg("data", () => CoachInput) data: CoachInput): Promise<Coach> {
    const coach = new Coach();
    coach.firstName = data.firstName;
    coach.lastName = data.lastName || '';
    coach.companyName = data.companyName || '';
    coach.email = data.email || '';
    coach.mobile = data.mobile || '';
    coach.password = data.password || ''
    coach.startDate = new Date(data.startDate || new Date());
    coach.planLevel = data.planLevel || 'Bronze';
    coach.planMaxPrograms = data.planMaxPrograms || 3;
    coach.planMaxContentItems = data.planMaxContentItems || 100;
    coach.planSubscribers = data.planSubscribers || 500;
    coach.status = data.status || 'active';

    await coach.save()

    return coach;
  }


  @Mutation(() => Coach)
  async updateCoachLogo(
    @Arg("data", () => CoachLogoInput) data: CoachLogoInput,
    @Arg("coachId") id: Number
  ): Promise<Coach> {
    
    const coach = await Coach.findOne({ where: { id: id } })
    if (coach) {

      const timestamp = Date.now();

      let uri = "";
      if(data.coachLogo.startsWith('data:') ){
         uri = data.coachLogo.split(';base64,').pop() || ''
      }
      
      const filename = `coach_logo_${id}_${timestamp}.jpg`
      const linodeUrl = await LinodeS3Upload(uri,filename).catch(error => console.log(error));

      coach.coachLogo = linodeUrl || ""
      await coach.save()

      return coach;

    } else {
      return new Coach()
    }

  }

  @Query(() => Coach)
  async coachLogin(@Arg("email", () => String) email: string, @Arg("password") password: string) {

    const coach = await Coach.findOne({ where: { email: email } })
    let loginPass = false;

    let notFound = new Coach();
    notFound.id = 0
    notFound.firstName = "NOTFOUND"
    notFound.email = "NOTFOUND"
    notFound.lastName = "NOTFOUND"

    if (coach) {
      if (coach.password == password) {
        loginPass = true;
      }
    }

    return loginPass ? coach : notFound;
  }

  // ----  Field Resolvers  ----   //
  @FieldResolver(() => Number)
  async numSubscribers(@Root() coach: Coach) {
    const sql = `select count(subscription.id) cnt from subscription  
                  inner join  program on program.id = subscription."programId"
                  where "coachId" = ${coach.id}`;
    const entityManager = getManager();
    const res = await entityManager.query(sql)
    return res[0].cnt
  }

  @FieldResolver(() => Number)
  async numPrograms(@Root() coach: Coach) {
    const sql = `select count(program.id) cnt from program  
                  where "coachId" = ${coach.id}`;
    const entityManager = getManager();
    const res = await entityManager.query(sql)
    return res[0].cnt
  }

  @FieldResolver(() => Number)
  async numContentItems(@Root() coach: Coach) {
    const sql = `select count(program_item.id) cnt from program_item  
                  inner join  program on program.id = program_item."programId"
                  where "coachId" = ${coach.id}`;
    const entityManager = getManager();
    const res = await entityManager.query(sql)
    return res[0].cnt
  }
}
