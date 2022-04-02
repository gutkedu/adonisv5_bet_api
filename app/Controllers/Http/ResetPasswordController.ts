import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ResetPasswordController {
  public async store({ request, response }: HttpContextContract) {
    const { token } = request.params()
    await request.validate({
      schema: schema.create({
        password: schema.string({}),
      }),
    })
    const password = request.input('password')
    const user = await User.findByOrFail('remember_me_token', token)
    user.password = password
    user.remember_me_token = null
    await user.save()
    response.status(200).send('Senha alterada')
  }
}
