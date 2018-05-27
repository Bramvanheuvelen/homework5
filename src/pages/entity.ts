import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsJSON } from 'class-validator'

@Entity()
export default class Games extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('text', {nullable:false})
  color: string

  @IsJSON()
  @Column('json', {nullable:false})
  board: string[][]
}