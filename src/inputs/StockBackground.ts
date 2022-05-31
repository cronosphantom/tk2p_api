import { InputType, Field } from "type-graphql";


@InputType()
export class StockBackgroundInput {
    @Field({ nullable: false })
    name: string;

    @Field({ nullable: false })
    url: string;

   


}