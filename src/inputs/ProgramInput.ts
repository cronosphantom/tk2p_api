import { InputType, Field } from "type-graphql";

@InputType()
export class ProgramInput {
    @Field({ nullable: false })
    coachId: number;

    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    frequency: string;

    @Field({ nullable: false })
    frequencyDetail: number;

    @Field({ nullable: false })
    frequencyTime: string;

}

