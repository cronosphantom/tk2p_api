import { InputType, Field } from "type-graphql";


@InputType()
export class CoachInput {
    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    companyName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    status?: string;

    @Field({ nullable: true })
    mobile?: string;

    @Field({ nullable: true })
    startDate?: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    planLevel?: string;

    @Field({ nullable: true })
    planMaxPrograms?: number;

    @Field({ nullable: true })
    planMaxContentItems?: number;

    @Field({ nullable: true })
    planSubscribers?: number;


}