import { InputType, Field } from "type-graphql";


@InputType()
export class CoachLogoInput {
    @Field({ nullable: false })
    coachLogo: string;
}