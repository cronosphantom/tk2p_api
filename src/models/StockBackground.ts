import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, EntityManager, getManager, OneToMany } from "typeorm";
import { ObjectType, Field, ID, FieldResolver, Root } from "type-graphql";
import { Coach, Subscription , ProgramItem} from "."


@Entity()
@ObjectType()
export class StockBackground extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  

  @Field({ nullable: false })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: false })
  @Column({ nullable: true })
  url: string;

  
}





