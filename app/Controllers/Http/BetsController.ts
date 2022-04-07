import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'
import User from 'App/Models/User'
import CreateBetValidator from 'App/Validators/CreateBetValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
import mailConfig from 'Config/mail'
import Bet from 'App/Models/Bet'

export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const Bets = await Bet.all();
    return response.status(200).send({ allBets: Bets })
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateBetValidator)
    const { user_id, min_cart_value, user_bets } = request.body()
    const user = await User.findOrFail(user_id)
    let cumulative_betPrice: number = 0;

    for (const bet of user_bets) {
      const game = await Game.findOrFail(bet.game_id)
      cumulative_betPrice += game.price;
    }

    if (cumulative_betPrice >= min_cart_value) {
      for (const bet of user_bets) {
        const game = await Game.findOrFail(bet.game_id)
        await user.related('games').attach({
          [game?.id]: {
            bet_numbers: bet.bet_numbers,
          }
        })
      }

      const message = {
        from: 'noreplay@luby.software.com',
        to: `${user.email}`,
        subject: 'Aposta relizada na Bet API.',
        text: `Prezado(a) ${user.name}. \n\nA sua aposta foi finalizada,
        confira no site para informações mais detalhadas. \n\n`,
        html: `Prezado(a) ${user.name}. <br><br> A sua aposta foi finalizada,
        confira no site para informações mais detalhadas. <br><br>`,
      }
      await mailConfig.sendMail(message, (err) => {
        if (err) {
          return response.status(400)
        }
      })
      return response.status(201).send({ user: user, total_price: cumulative_betPrice, bets: user_bets })
    }
    else {
      return response.badRequest({
        error: `O valor total da aposta foi de R$${cumulative_betPrice}, menor que o minimo de R$${min_cart_value}.`
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const user = await User.findOrFail(id)
    const bets = await Bet
      .query()
      .where('user_id', user.id)
    return response.status(200).send({ userBets: bets })
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await request.validate({
      schema: schema.create({
        bet_numbers: schema.string({})
      }),
    })
    const { bet_numbers } = request.body();
    const bet = await Bet.findByOrFail('id', id)
    await bet.merge({ bet_numbers: bet_numbers }).save()
    return response.status(200).send({ bet })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const bet = await Bet.findByOrFail('id', id)
    await bet.delete()
    return response.status(200).send(`Aposta com id ${id} deletada`)
  }
}
