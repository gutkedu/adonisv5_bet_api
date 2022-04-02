import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import mailConfig from 'Config/mail'
import { v4 as uuidv4 } from 'uuid';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ForgotPasswordController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email()
        ])
      })
    })
    const email = request.input('email');
    const user = await User.findByOrFail('email', email);

    const rememberMeToken = uuidv4();
    user.remember_me_token = rememberMeToken;
    await user.save();

    const message = {
      from: "noreplay@luby.software.com",
      to: `${user.email}`,
      subject: 'Bet api - Recuperação de senha',
      text: `Prezado(a) ${user.name}. \n\nParece que você solicitou uma
      recuperação de senha, caso queria prosseguir clique no link abaixo:\n\n
      http://localhost:3333/reset/${rememberMeToken}, \n\n
      Caso não tenha sido você quem fez a solicitação,favor descartar o e-mail.`,
      html: `Prezado(a) ${user.name}. <br><br> Parece que você solicitou uma
      recuperação de senha, caso queria prosseguir clique no link abaixo:
      <br><br> <a href="http://localhost:3333/reset/${rememberMeToken}">
       Recuperar senha </a> <br><br>Caso não tenha sido você quem fez a
       solicitação, favor descartar o e-mail.`
    }

    await mailConfig.sendMail(message, (err) => {
      if (err) {
        return response.status(400)
      }
    })
  }
}
