import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid';

import Game from './Game';
import Role from './Role';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: uuidv4

  @column()
  public name: string

  @column()
  public email: string

  @column({})
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUUid(user: User) {
    user.id = uuidv4();
  }

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
    pivotTimestamps: {
      createdAt: true,
      updatedAt: false
    }
  })
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Game, {
    pivotTable: 'bets',
    pivotColumns: ['bet_numbers'],
    pivotTimestamps: true
  })
  public games: ManyToMany<typeof Game>

}
