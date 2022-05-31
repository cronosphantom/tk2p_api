import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, EntityManager, getManager, OneToMany } from "typeorm";
import { ObjectType, Field, ID, FieldResolver, Root } from "type-graphql";
import { Coach, Subscription , ProgramItem} from "."


@Entity()
@ObjectType()
export class Program extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ nullable: true })
  userId: number;

  @Field({ nullable: false })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  code: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  frequency: string;

  @Field()
  @Column({ nullable: true })
  frequencyDetail: number;

  @Field()
  @Column({ nullable: true })
  frequencyTime: string;
    //========== Realations ====================//
  // set relation with Company table
  @Field(() => Coach,{nullable:true})
  @ManyToOne(() => Coach , coach => coach.id)
  coach: Coach

  @Field(() => Subscription,{nullable:true})
  @ManyToOne(() => Subscription , sub => sub.id)
  subscriptions: Subscription

  @Field(() => ProgramItem,{nullable:true})
  @OneToMany(() => ProgramItem , sub => sub.program)
  programItems: ProgramItem
}





