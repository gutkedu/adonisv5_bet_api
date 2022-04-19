import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import UserRoleValidator from 'App/Validators/UserRoleValidator'

export default class UserRolesController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(UserRoleValidator)
    const { user_id, privilege } = request.body()
    const user = await User.findOrFail(user_id)
    if (!user) return response.status(400).send({ error: 'Invalid user id' })
    const role = await Role.findByOrFail('privilege', privilege)
    if (!role) return response.status(400).send({ error: 'Invalid role id' })
    await user.related('roles').attach([role.id])
    return response.status(201).json({ user, role })
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(UserRoleValidator)
    const { user_id, privilege } = request.body()
    const user = await User.findOrFail(user_id)
    if (!user) return response.status(400).send({ error: 'Invalid user id' })
    const role = await Role.findByOrFail('privilege', privilege)
    if (!role) return response.status(400).send({ error: 'Invalid role id' })
    await user.related('roles').detach([role.id])
    return response.status(204)
  }
}
