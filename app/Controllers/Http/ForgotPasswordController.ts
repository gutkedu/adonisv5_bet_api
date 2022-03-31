import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import mailConfig from 'Config/mail'

export default class ForgotPasswordController {
  public async store({ auth, request, response }: HttpContextContract) {
    const email = request.input('email');
    const user = await User.findByOrFail('email', email);

    const token = await auth.use('api').generate(user, {
      expiresIn: '2hours'
    })

    const message = {
      from: "noreplay@luby.software.com",
      to: `${user.email}`,
      subject: 'Bet api - Recuperação de senha',
      text: `Prezado(a) ${user.name}. \n\nParece que você solicitou uma
      recuperação de senha, caso queria prosseguir clique no link abaixo:\n\n
      <link>token: ${token.token}, \n\n Caso não tenha sido você quem fez a solicitação,
      favor descartar o e-mail.`,
      html: `Prezado(a) ${user.name}. <br><br> Parece que você solicitou uma
      recuperação de senha, caso queria prosseguir clique no link abaixo:
      <br><br> <a href=""> Recuperar senha </a> <br><br> token: ${token.token}
      Caso não tenha sido você quem fez a solicitação, favor descartar o e-mail.`
    }

    await mailConfig.sendMail(message, (err) => {
      if (err) {
        return response.status(400)
      }
    })
  }
}
