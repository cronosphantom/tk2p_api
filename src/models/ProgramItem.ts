import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Program } from ".";


@Entity()
@ObjectType()
export class ProgramItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column( {nullable: true})
  name: string;

  @Field()
  @Column({ nullable: true })
  order: number;

  @Field()
  @Column({ nullable: true })
  text: string;
  
  @Field()
  @Column({ nullable: true })
  contentType: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  graphic: string;

  @Field()
  @Column({ nullable: true })
  fontSize: string;

  @Field()
  @Column({ nullable: true })
  fontColor: string;

  @Field()
  @Column({ nullable: true })
  fontFamily: string;

  @Field()
  @Column({ nullable: true })
  textPositionY: string;

  @Field()
  @Column({ nullable: true })
  textPositionX: string;

  @Field()
  @Column({ nullable: true })
  logoUrl: string;


  @Field()
  @Column({ nullable: true })
  logoPositionY: string;

  @Field()
  @Column({ nullable: true })
  logoPositionX: string;


  @Field({ nullable: false })
  @Column({ nullable: true })
  backgroundColor: string;


  //========== Realations ====================//

  @Field(() => Program, {nullable:true})
  @ManyToOne(() => Program , p => p.id)
  program: Program
}





