import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { ProgramItem } from "../models/ProgramItem";

import { ProgramItemInput } from "../inputs/ProgramItemInput";

import { Repository } from "typeorm";
import { Coach, Program } from "../models";

@Resolver(of => ProgramItem)
export class ProgramItemResolver {
  constructor(private programitemRepo: Repository<ProgramItem>) {

  }

  @Query(() => [ProgramItem])
  async programItems(@Arg("programId") id: number) {
     let programItems: ProgramItem[] = await ProgramItem.find({ where:{ program:{id} }});
    return programItems.map(item => {
      for( const key in item) {
        // @ts-ignore
        if(!item[key]) {
          // @ts-ignore
          item[key] = ""
        }
      }
      return item      
    }) || [];
  }
  @Query(() => ProgramItem)
  async programItem(@Arg("programItemId") id: number) {
    let obj: ProgramItem = await ProgramItem.findOne(  id ) || new ProgramItem();
    for( const key in obj) {
      // @ts-ignore
      if(!obj[key]) {
        // @ts-ignore
        obj[key] = ""
      }
    }
    return obj;
  }
  @Mutation(() => ProgramItem)
  async updateProgramItem(
    @Arg("data", () => ProgramItemInput) data: ProgramItemInput,
    @Arg("id") id: Number): Promise<ProgramItem> {

    delete data.programId;
    const programitem: any = await ProgramItem.findOne({
      where: { id: id }
    });

    return ProgramItem.save({
      ...programitem,
      ...data
    });
  }

  @Mutation(() => ProgramItem)
  async createProgramItem(@Arg("data", () => ProgramItemInput) data: ProgramItemInput): Promise<ProgramItem> {
    const programItem = new ProgramItem();
    const program = await Program.findOne(data.programId) || new Program();
    let dataSrc = {...data};
    delete dataSrc.programId
    programItem.program = program
    Object.assign(programItem,dataSrc)
    await programItem.save()

    return programItem;
  }

  @Mutation(() => ProgramItem)
  async deleteProgramItem(@Arg("id", ()=> String) id: string){
    const item = await ProgramItem.findOne(id)
    await ProgramItem.delete(id)

    return item;

  }

 
}
