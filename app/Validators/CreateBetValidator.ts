import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBetValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    user_id: schema.string({}, [
      rules.uuid()
    ]),
    gameType: schema.string({}),
    bet_numbers: schema.string({})
  })

  public messages = {}
}
