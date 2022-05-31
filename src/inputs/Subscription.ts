import { InputType, Field } from "type-graphql";


@InputType()
export class SubscriptionInput {
    @Field({ nullable: false })
    programId: string;

    @Field({ nullable: true })
    userId: string;
}

@InputType()
export class SubscriberRegistrationInput {
    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: false })
    lastName: string;

    @Field({ nullable: true })
    code: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    mobile: string;
}