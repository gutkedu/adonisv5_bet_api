import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthUserValidator from 'App/Validators/AuthUserValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    await request.validate(AuthUserValidator)
    const email = request.input('email')
    const password = request.input('password')
    let role_arr: any = []
    try {
      const user = await User.findByOrFail('email', email)
      const user_roles = await user.related('roles').query()
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: Env.get('NODE_ENV') === 'development' ? '' : '1day',
        name: user?.serialize().email,
      })
      for (const role of user_roles) {
        role_arr.push(role)
      }
      return response.status(200).json({ token: token.token, user, user_role: role_arr })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
