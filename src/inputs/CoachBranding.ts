import { InputType, Field } from "type-graphql";


@InputType()
export class CoachBrandingInput {
  @Field({ nullable: false })
  menuBackgroundColor: string;

  @Field({ nullable: false })
  menuTextColor: string;

  @Field({ nullable: false })
  fontFamily: string;

  @Field()
  fontSize: string;

  @Field()
  contentColor: string;
  


}

@InputType()
export class CoachBrandingContactInput {

  @Field({nullable: true})
  welcomeMessage: string;
 
  @Field({nullable: true})
  contactInfoName: string;

  @Field({nullable: true})
  contactInfoHeader: string;

  @Field({nullable: true})
  contactInfoPhoto?: string;

  @Field({nullable: true})
  contactInfoIntroduction: string;

  @Field({nullable: true})
  contactInfoEmail?: string;

  @Field({nullable: true})
  contactInfoTwitter?: string;

  @Field({nullable: true})
  contactInfoYoutube?: string;

  @Field({nullable: true})
  contactInfoFacebook?: string;

  @Field({nullable: true})
  contactInfoInstagram?: string;

  @Field({nullable: true})
  contactInfoLinkedIn?: string;

}