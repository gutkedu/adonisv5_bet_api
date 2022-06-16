import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { v4 as uuidv4 } from 'uuid'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import kafkaConfig from 'Config/kafka'

export default class ForgotPasswordController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
      }),
    })
    const email = request.input('email')
    const user = await User.findByOrFail('email', email)

    const rememberMeToken = uuidv4()
    user.remember_me_token = rememberMeToken
    await user.save()

    const userForgotPassProducer = kafkaConfig.producer()
    await userForgotPassProducer.connect()

    await userForgotPassProducer.send({
      topic: 'emails-forgotPassword',
      messages: [
        {
          value: JSON.stringify({
            name: user.name,
            email: user.email,
            rememberMeToken: rememberMeToken,
          }),
        },
      ],
    })

    await userForgotPassProducer.disconnect()

    return response.status(204)
  }
}
