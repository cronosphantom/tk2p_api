import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, EntityManager, getManager, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Program, ProgramItem, User } from "."


@Entity()
@ObjectType()
export class Subscription extends BaseEntity {
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

  @Field({ nullable: false })
  @Column({ nullable: true })
  status: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  getNotified: boolean;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  createdAt: Date;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deviceId: string;


    //========== Realations ====================//
  @Field(() => User,{nullable:false})
  @ManyToOne(() => User , user => user.id)
  subscriber: User

  @Field(() => Program,{nullable:false})
  @ManyToOne(() => Program , program => program.id)
  program: Program

  @Field(() => ProgramItem, { nullable: true })
  @OneToOne(() => ProgramItem)
  @JoinColumn()
  lastProgramItem: ProgramItem;

}





