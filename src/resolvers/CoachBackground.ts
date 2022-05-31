import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from "type-graphql";
import { Coach, CoachBackground } from "../models/";
import { CoachBackgroundInput } from "../inputs/CoachBackground";
import { LinodeS3Upload } from "../utils/LinodeS3Upload";

@Resolver(of => CoachBackground)
export class CoachBackgroundResolver {
  constructor() {

  }

  @Query(() => [CoachBackground])
  async coachBackgrounds(
    @Arg("coachId") id: Number
  ) {
    let objs: CoachBackground[] = await CoachBackground.find({where:{coach: {id}}});
    return objs;
  }

   

  @Mutation(() => CoachBackground)
  async createCoachBackground(@Arg("data", () => CoachBackgroundInput) data: CoachBackgroundInput): Promise<CoachBackground> {
    const obj = new CoachBackground();
    const coach = await Coach.findOne(data.coachId) || new Coach();
    obj.name = data.name;
    obj.coach = coach
    const timestamp = Date.now();
    //obj.url = data.url;
    //Check to see if base64 prefix exists.
    let uri = data.url
    if(data.url.startsWith('data:') ){
       uri = data.url.split(';base64,').pop() || ''
    }
    
    
    //Push to Linode Bucket and change the URL to the S3 Location
    const filename = `coach_background_${data.coachId}_${timestamp}.jpg`
    const linodeFile = await LinodeS3Upload(uri,filename).catch(error => console.log(error));
    if (linodeFile) {
      obj.url = linodeFile;
      await obj.save()
    }
  
    return obj;
  }

  @Mutation(() => CoachBackground)
  async deleteCoachBackground(@Arg("id", ()=> String) id: string){
    const obj = await CoachBackground.findOne(id)
    await CoachBackground.delete(id)
    return obj;

  }

}
