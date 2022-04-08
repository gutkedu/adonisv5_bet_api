import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import mailConfig from 'Config/mail'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import Bet from 'App/Models/Bet'
import Role from 'App/Models/Role'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const user = await User.all()
    return response.status(200).json(user)
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

      const role = await Role.findByOrFail('privilege', 'Player')
      await new_user.related('roles').attach([role.id])

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
      return response.status(201).json(new_user)
    } else {
      return response.status(409).json({ message: `User with ${user.email} already exist` })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const currentDate = new Date()
    let lastMonthBets: any = []
    const lastMonth = currentDate.getMonth()
    try {
      const user = await User.findOrFail(id)
      const bets = await Bet.query().where('user_id', user.id)
      bets.forEach((item) => {
        if (item.createdAt.month === lastMonth) {                                  
          lastMonthBets.push(item)
        } else return
      })
      return response.status(200).json({ user, lastMonthBets })
    } catch {
      return response.badRequest({ error: 'Invalid user_id' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateUserValidator)
    const { id } = request.params()
    const { name, email } = request.body()
    try {
      const user = await User.findOrFail(id)
      await user
        .merge({
          name: name,
          email: email,
        })
        .save()
      return response.status(200).json(user)
    } catch {
      return response.badRequest({ error: 'Invalid user id' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const user = await User.findByOrFail('id', id)
      await user.delete()
      return response.status(200).json({ deleted_user: user })
    } catch {
      return response.badRequest({ error: 'Invalid user id' })
    }
  }
}
