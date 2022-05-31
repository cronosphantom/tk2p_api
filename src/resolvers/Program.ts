import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { Program, Coach } from "../models/";

import { ProgramInput } from "../inputs/ProgramInput";

import { getManager, Repository } from "typeorm";
import { customAlphabet } from 'nanoid'

@Resolver(of => Program)
export class ProgramResolver {
  constructor(private programRepo: Repository<Program>) {

  }

  @Query(() => [Program])
  async programs(@Arg("userId") id: number) {
    let programs: Program[] = await Program.find({ userId: id });
    return programs;
  }

  @Query(() => Program)
  async program(@Arg("programId") id: number) {
    let obj: Program = await Program.findOne(  id ) || new Program();
    return obj;
  }
  @Mutation(() => Program)
  async updateProgram(
    @Arg("data", () => ProgramInput) data: ProgramInput,
    @Arg("id") id: Number): Promise<Program> {

    const program: any = await Program.findOne({
      where: { id: id }
    });

    return await Program.save({
      ...program,
      ...data
    });
  }

  

  @Mutation(() => Program)
  async createProgram(@Arg("data", () => ProgramInput) data: ProgramInput): Promise<Program> {


    const coach = await Coach.findOne(data.coachId) || new Coach()
    let program = new Program();
    try{
    program.coach = coach;
    const accessCode = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ',7); // <--- LIMIT TO 7
    program.code = accessCode();
    program.name = data.name;
    program.frequency = data.frequency;
    program.frequencyDetail = data.frequencyDetail;
    program.frequencyTime = data.frequencyTime;
    await program.save()
   
    
  }
  catch(e){
    console.log(e)
  }
  return program;
  }

  @Mutation(() => Program)
  async deleteProgram(@Arg("id", ()=> String) id: string){
    const program = await Program.findOne(id)
    const coach = await Coach.findOne(program?.coach) || new Coach()
    await coach.save();
    await Program.delete(id)

    return program;

  }

  // ----  Field Resolvers  ----   //
  @FieldResolver(()=>Number)
  async numSubscribers(@Root() program: Program){
    const sql = `select count(id) cnt from subscription where "programId" = ${program.id}`;
    const entityManager = getManager();
    const res = await entityManager.query(sql)
    return res[0].cnt
  }
  @FieldResolver(()=>Number)
  async numContentItems(@Root() program: Program){
    const sql = `select count(id) cnt from program_item where "programId" = ${program.id}`;
    const entityManager = getManager();
    const res = await entityManager.query(sql)
    return res[0].cnt
  }
}
