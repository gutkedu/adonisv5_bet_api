import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthUserValidator from 'App/Validators/AuthUserValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    await request.validate(AuthUserValidator)
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.findBy('email', email)
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1day',
        name: user?.serialize().email,
      })
      return { token, user: user?.serialize() }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
