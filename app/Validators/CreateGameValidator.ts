import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGameValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    type: schema.string({}, [
      rules.minLength(3),
    ]),
    description: schema.string({}),
    range: schema.number([rules.range(0, 1000)]),
    price: schema.number([rules.range(0, 1000)]),
    max_number: schema.number([rules.range(0, 1000)]),
    color: schema.string({}),
  })
  public messages = {}
}
