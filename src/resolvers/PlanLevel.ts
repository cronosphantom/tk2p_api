import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { PlanLevel, Coach } from "../models/";

import { PlanLevelInput } from "../inputs/PlanLevelInput";

import { getManager, Repository } from "typeorm";
import { customAlphabet } from 'nanoid'

@Resolver(of => PlanLevel)
export class PlanLevelResolver {
  constructor(private planLevelRepo: Repository<PlanLevel>) {

  }

  @Query(() => [PlanLevel])
  async planLevels(@Arg("userId") id: number) {
    let PlanLevels: PlanLevel[] = await PlanLevel.find();
    return PlanLevels;
  }

  @Query(() => PlanLevel)
  async PlanLevel(@Arg("PlanLevelId") id: number) {
    let obj: PlanLevel = await PlanLevel.findOne(  id ) || new PlanLevel();
    return obj;
  }
  @Mutation(() => PlanLevel)
  async updatePlanLevel(
    @Arg("data", () => PlanLevelInput) data: PlanLevelInput,
    @Arg("id") id: Number): Promise<PlanLevel> {

    const planLevel: any = await PlanLevel.findOne({
      where: { id: id }
    });

    return await planLevel.save({
      ...planLevel,
      ...data
    });
  }

  

  @Mutation(() => PlanLevel)
  async createPlanLevel(@Arg("data", () => PlanLevelInput) data: PlanLevelInput): Promise<PlanLevel> {


    
    let planLevel = new PlanLevel();
    try{
      Object.assign(planLevel, data);
      await planLevel.save()
   
    
  }
  catch(e){
    console.log(e)
  }
  return planLevel;
  }

  @Mutation(() => PlanLevel)
  async deletePlanLevel(@Arg("id", ()=> String) id: string){
    const obj = await PlanLevel.findOne(id)
    await PlanLevel.delete(id)
    return obj;

  }

 
}
