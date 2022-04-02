import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { id } = request.params()
    let isAdmin!: boolean
    const user = await User.findByOrFail('id', id)
    const user_roles = await user.related('roles').query()
    user_roles.forEach((item) => {
      if (item.privilege === ('Admin' || 'admin')) {
        console.log(item.privilege)
        isAdmin = true
      }
    })
    if (isAdmin === true) await next()
    else return response.badRequest('Invalid role credentials')
  }
}
