import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const user_id = request.header('admin_id')
    let isAdmin!: boolean
    try {
      const user = await User.findByOrFail('id', user_id)
      const user_roles = await user.related('roles').query()
      user_roles.forEach((item) => {
        if (item.privilege === ('Admin' || 'admin')) {
          isAdmin = true
        }
      })
    } catch (error) {
      return response.badRequest('Invalid role credentials')
    }
    if (isAdmin === true) await next()
    else return response.badRequest('Invalid role credentials')
  }
}
