import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Coach, Program } from ".";


@Entity()
@ObjectType()
export class CoachBranding extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  setId() {
   
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  updateUpdatedAt(){
    this.updatedAt = new Date()
  }

 
  @Field({ nullable: true })
  @Column({ nullable: true })
  menuBackgroundColor: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  menuTextColor: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fontFamily: string;

  @Field({ nullable: true })
  @Column({ nullable: false })
  fontSize: string;

  @Field({ nullable: true })
  @Column({ nullable: false })
  contentColor: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  welcomeMessage: string;
 
  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoHeader: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoPhoto: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoIntroduction: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoEmail: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoTwitter: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoYoutube: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoFacebook: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoInstagram: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactInfoLinkedIn: string;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  createdAt: Date;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  updatedAt: Date;

     //========== Realations ====================//

  @Field(()=> Coach)
  @OneToOne(() => Coach)
  @JoinColumn()
  coach: Coach
}





