import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UserRolesController {
  public async store({ request, response }: HttpContextContract) {
    const { user_id, role_id } = request.body()
    const user = await User.findOrFail(user_id)
    const role = await Role.findOrFail(role_id)
    await user.related('roles').attach([role.id])
    return response.status(200).send('OK')
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { user_id, role_id } = request.body()
    const user = await User.findOrFail(user_id)
    const role = await Role.findOrFail(role_id)
    await user.related('roles').detach([role.id])
    return response.status(200).send('OK')
  }
}
