import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/User";

import { UserInput } from "../inputs/UserInput";

import { DeleteResult, Repository } from "typeorm";

@Resolver(of => User)
export class UserResolver {
  constructor(private userRepo: Repository<User>) {

  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  async user(@Arg("id") id: number) {
    let users: User[] = await User.find({ id: id });
    return users[0];
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("data", () => UserInput) data: UserInput,
    @Arg("id") id: Number): Promise<User> {


    const user: any = await User.findOne({
      where: { id: id }
    });

    return User.save({
      ...user,
      ...data
    });
  }

  @Mutation(() => User)
  async createUser(@Arg("data", () => UserInput) data: UserInput): Promise<User> {
    const user = await User.create<User>(data).save();
    user.save()

    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: number): Promise<String> {

    const deleteResult: DeleteResult = await User.delete({ id: id });
    if (deleteResult.affected === 0) return "failed. No user exists";

    return "success";
  }
}
