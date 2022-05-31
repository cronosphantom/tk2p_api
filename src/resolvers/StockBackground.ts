import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { StockBackground } from "../models/";

import { getManager, Repository } from "typeorm";
import { customAlphabet } from 'nanoid'
import { StockBackgroundInput } from "../inputs/StockBackground";

@Resolver(of => StockBackground)
export class StockBackgroundesolver {
  constructor() {

  }

  @Query(() => [StockBackground])
  async stockBackgrounds() {
    let objs: StockBackground[] = await StockBackground.find();
    return objs;
  }

  
  

  @Mutation(() => StockBackground)
  async createStockBackground(@Arg("data", () => StockBackgroundInput) data: StockBackgroundInput): Promise<StockBackground> {
    const obj = new StockBackground();
    obj.name = data.name;
    obj.url = data.url;
   
    await obj.save()
  
  return obj;
  }

  @Mutation(() => StockBackground)
  async deleteStockBackground(@Arg("id", ()=> String) id: string){
    const obj = await StockBackground.findOne(id)
    await StockBackground.delete(id)
    return obj;

  }

}
