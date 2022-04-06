import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthUserValidator from 'App/Validators/AuthUserValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    await request.validate(AuthUserValidator)
    const email = request.input('email')
    const password = request.input('password')
    try {
      const user = await User.findBy('email', email)
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: Env.get('NODE_ENV') === "development" ? '' : '1day',
        name: user?.serialize().email,
      })
      return response.status(200).send({ token })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
