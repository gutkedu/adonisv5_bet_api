import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid';
import Hash from '@ioc:Adonis/Core/Hash'
import Game from './Game';
import Role from './Role';


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: uuidv4

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public remember_me_token: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUUid(user: User) {
    user.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
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
    serializeAs: 'user_games',
    pivotTable: 'bets',
    pivotTimestamps: true
  })
  public games: ManyToMany<typeof Game>

}
