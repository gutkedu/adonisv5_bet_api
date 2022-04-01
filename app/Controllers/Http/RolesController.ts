import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import CreateRoleValidator from 'App/Validators/CreateRoleValidator';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    const roles = await Role.all()
    return response.status(200).send(roles);
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateRoleValidator)
    const { privilege, description } = request.body();
    const searchPayload = { privilege: privilege }
    const savePayload = {
      description: description
    }
    await Role.firstOrCreate(searchPayload, savePayload)
    return response.status(201).send('Role created!')
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const roles = await Role.findOrFail(id);
    return response.status(200).send(roles);
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await request.validate({
      schema: schema.create({
        description: schema.string({})
      })
    })
    const { description } = request.body();
    const roles = await Role.findOrFail(id);
    await roles
      .merge({
        description: description
      })
      .save()
    return response.status(200).send(roles)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const roles = await Role.findOrFail(id)
    await roles.delete()
    return response.status(202).send(`Role com id: ${id} deletada`)
  }
}
