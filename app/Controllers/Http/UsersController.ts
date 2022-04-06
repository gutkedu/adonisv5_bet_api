import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import mailConfig from 'Config/mail'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import Bet from 'App/Models/Bet'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const user = await User.all()
    return response.status(200).send(user)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateUserValidator)
    const { name, email, password } = request.body()
    const user = await User.findBy('email', email)

    if (!user) {
      const new_user = await User.create({
        name: name,
        email: email,
        password: password,
      })

      const message = {
        from: 'noreplay@luby.software.com',
        to: `${new_user.email}`,
        subject: 'Cadastro finalizado na plataforma de apostas.',
        text: `Prezado(a) ${new_user.name}. \n\nO seu cadastro foi
        finalizado.\n\n`,
        html: `Prezado(a) ${new_user.name}. <br><br> O seu cadastro foi
        finalizado. <br><br>`,
      }

      await mailConfig.sendMail(message, (err) => {
        if (err) {
          return response.status(400)
        }
      })
      return response.status(201).send(`Usuario com e-mail ${new_user.email} criado!`)
    } else {
      return response.status(200).send(`Usuario com e-mail ${user.email} ja existe`)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const currentDate = new Date()
    let lastMonthBets: any = [];
    const lastMonth = currentDate.getMonth();
    const user = await User.findByOrFail('id', id)
    const bets = await Bet.query().where('user_id', user.id)
    bets.forEach((item) => {
      if (item.createdAt.month === lastMonth) {
        lastMonthBets.push(item);
      }
      else
        return;
    })
    return response.status(200).send({ user, lastMonthBets })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateUserValidator)
    const { id, name, email } = request.body()
    const user = await User.findOrFail(id)
    await user
      .merge({
        name: name,
        email: email,
      })
      .save()
    return response.status(200).send(user)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { user_id } = request.body()
    const user = await User.findByOrFail('id', user_id)
    await user.delete()
    return response.status(202).send(user)
  }
}
