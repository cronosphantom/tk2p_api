import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Program } from ".";
import { CoachBranding } from "./CoachBranding";
import { CoachBackground } from "./CoachBackground";


@Entity()
@Unique(["email"])
@ObjectType()
export class Coach extends BaseEntity {
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
  firstName: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  companyName: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  @Field()
  @Column({ nullable: false })
  status: string;
  

  @Field({ nullable: true })
  @Column({ nullable: true })
  mobile: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coachLogo: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  planLevel: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  planMaxPrograms: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  planMaxContentItems: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  planSubscribers: number;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  startDate: Date;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  createdAt: Date;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  updatedAt: Date;

     //========== Realations ====================//
  // set relation with Company table
  @Field(() => [Program],{nullable:true})
  @OneToMany(() => Program , p => p.coach)
  programs: Program[]

  // set relation with Company table
  @Field(() => [CoachBackground],{nullable:true})
  @OneToMany(() => CoachBackground , p => p.coach)
  backgrounds: CoachBackground[]

  @Field(()=> CoachBranding)
  @OneToOne(() => CoachBranding)
  @JoinColumn()
  branding: CoachBranding
}





