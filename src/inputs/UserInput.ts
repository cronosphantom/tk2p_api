import { InputType, Field } from "type-graphql";


@InputType()
export class UserInput {
    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    mobile?: string;
}