import { InputType, Field } from "type-graphql";


@InputType()
export class CoachBackgroundInput {
    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    url: string;

    @Field({ nullable: false })
    coachId: string;

   


}