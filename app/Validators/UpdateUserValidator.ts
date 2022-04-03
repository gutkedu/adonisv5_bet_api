import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.string({}, [rules.uuid()]),
    name: schema.string({}, [rules.alpha()]),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
  })
  public messages = {}
}
