import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const logged_user: any = auth.user;
    let isAdmin!: boolean
    try {
      const user = await User.findByOrFail('id', logged_user.id)
      const user_roles = await user.related('roles').query()
      user_roles.forEach((item) => {
        if (item.privilege === ('Admin' || 'admin')) {
          isAdmin = true
        }
      })
    } catch (error) {
      return response.badRequest({ error: 'Invalid role credentials' })
    }
    if (isAdmin === true) await next()
    else return response.badRequest({ error: 'Invalid role credentials' })
  }
}
