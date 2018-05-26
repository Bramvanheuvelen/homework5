import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
// import { Contains } from 'class-validator'

@Entity()
export default class Games extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  //@Contains('red', 'blue', color)	
  @Column('text', {nullable:false})
  color: string

  @Column('json', {nullable:false})
  board: string
}