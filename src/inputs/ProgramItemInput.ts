import { InputType, Field } from "type-graphql";

@InputType()
export class ProgramItemInput {

    @Field({ nullable: false })
    order?: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    contentType?: string;

    @Field({ nullable: true })
    text?: string;


    @Field({ nullable: true })
    graphic?: string;

    @Field({ nullable: true })
    programId?: string;

    @Field({ nullable: true })
    fontSize?: string;

    @Field({ nullable: true })
    fontColor?: string;

   

    @Field({ nullable: true })
    fontFamily?: string;


    @Field({ nullable: true })
    textPositionY?: string;

    @Field({ nullable: true })
    textPositionX?: string;

   

    @Field({ nullable: true })
    logoPositionY?: string;

    @Field({ nullable: true })
    logoPositionX?: string;

    @Field({ nullable: true })
    logoUrl?: string;

    @Field({ nullable: true })
    backgroundColor?: string;

    
}

