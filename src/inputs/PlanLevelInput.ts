import { InputType, Field } from "type-graphql";





@InputType()
export class PlanLevelInput {
    @Field({ nullable: false })
    planName: string;
    
    @Field({ nullable: false })
    planSubscribers: number;
    
    @Field({ nullable: true })
    planMaxPrograms: number;
    
    @Field({ nullable: false })
    planMaxContentItems: number;
}