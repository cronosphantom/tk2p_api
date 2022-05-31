import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { CoachBranding, Coach } from "../models/";
import { CoachBrandingContactInput, CoachBrandingInput } from "../inputs/CoachBranding";

@Resolver(of => CoachBranding)
export class CoachBrandingResolver {
  constructor() {

  }

  @Query(() => CoachBranding)
  async CoachBranding(@Arg("id") id: number) {
    let coachBranding= await CoachBranding.findOne({where: {coach:{id}}}) ||  new CoachBranding();
    return coachBranding;
  }




  @Mutation(() => CoachBranding)
  async updateCoachBranding(
    @Arg("data", () => CoachBrandingInput) data: CoachBrandingInput,
    @Arg("id") id: number): Promise<Coach> {

    const coach: any = await Coach.findOne(id);
    
    const coachBranding: any  = await CoachBranding.findOne({where: {coach:{id}}}) ||  new CoachBranding();
    coachBranding.coach = coach;

    const res =  await CoachBranding.save({
      ...coachBranding,
      ...data
    });
    
    return res;
  }

  @Mutation(() => CoachBranding)
  async updateCoachBrandingContactInfo(
    @Arg("data", () => CoachBrandingContactInput) data: CoachBrandingContactInput,
    @Arg("id") id: number): Promise<Coach> {

    const coach: any = await Coach.findOne(id);
    
    const coachBranding: any  = await CoachBranding.findOne({where: {coach:{id}}}) ||  new CoachBranding();
    coachBranding.coach = coach;

    const res =  await CoachBranding.save({
      ...coachBranding,
      ...data
    });
    
    return res;
  }

 


}
