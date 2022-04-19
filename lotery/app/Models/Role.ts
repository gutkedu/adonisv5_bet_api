import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: uuidv4

  @column()
  public privilege: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @beforeCreate()
  public static assignUuid(role: Role) {
    role.id = uuidv4()
  }
}
