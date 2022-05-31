import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany, BeforeInsert, BeforeUpdate, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";



@Entity()
@Unique(["planName"])
@ObjectType()
export class PlanLevel extends BaseEntity {
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
  @Column({ nullable: false })
  planName: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  planSubscribers: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  planMaxPrograms: number;

  @Field({ nullable: false })
  @Column({ nullable: false })
  planMaxContentItems: number;


  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  createdAt: Date;

  @Field(() => Date, {nullable:true})
  @Column({nullable:true})
  updatedAt: Date;


}





