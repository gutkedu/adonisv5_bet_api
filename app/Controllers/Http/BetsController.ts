import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game';
import User from 'App/Models/User';
import CreateBetValidator from 'App/Validators/CreateBetValidator';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import mailConfig from 'Config/mail';

export default class BetsController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateBetValidator)
    const { user_id, gameType, bet_numbers } = request.body();
    const user = await User.findOrFail(user_id);
    const game = await Game.findByOrFail('type', gameType);

    await user.related('games').attach({
      [game.id]: {
        bet_numbers: bet_numbers
      }
    })

    const message = {
      from: "noreplay@luby.software.com",
      to: `${user.email}`,
      subject: 'Aposta relizada na Bet API.',
      text: `Prezado(a) ${user.name}. \n\nA sua aposta para o Jogo
      ${game.type} foi finalizada, com os numeros: ${bet_numbers}.\n\n`,
      html: `Prezado(a) ${user.name}. <br><br> A sua aposta para o Jogo
      ${game.type} foi finalizada, com os numeros: ${bet_numbers}. <br><br>`
    }

    await mailConfig.sendMail(message, (err) => {
      if (err) {
        return response.status(400)
      }
    })

    return response.status(201).send(`Aposta do jogo ${gameType} criada!`)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate({
      schema: schema.create({
        user_id: schema.string({}, [
          rules.uuid()
        ]),
        gameType: schema.string({})
      })
    })
    const { user_id, gameType } = request.body();
    const user = await User.findOrFail(user_id);
    const game = await Game.findByOrFail('type', gameType);
    await user.related('games').detach([game.id])
    return response.status(200).send(`Aposta do jogo ${gameType} deletada`)
  }
}
