import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({}, [rules.uuid()]),
    min_cart_value: schema.number([rules.unsigned()]),
    user_bets: schema.array().members(
      schema.object().members({
        game_id: schema.string({}, [rules.uuid()]),
        bet_numbers: schema.string(),
      })
    ),
  })

  public messages = {}
}
