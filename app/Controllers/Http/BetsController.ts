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
    const { user_id, user_bets } = request.body()
    const user = await User.findOrFail(user_id)
    const games_arr: any = [];
    const betsNum_arr: any = [];

    user_bets.forEach(async (bet) => {
      games_arr.push(bet.gameType);
      betsNum_arr.push(bet.bet_numbers);
      const game = await Game.findByOrFail('type', bet.gameType)
      await user.related('games').attach({
        [game?.id]: {
          bet_numbers: bet.bet_numbers,
        }
      })
    })

    const message = {
      from: 'noreplay@luby.software.com',
      to: `${user.email}`,
      subject: 'Aposta relizada na Bet API.',
      text: `Prezado(a) ${user.name}. \n\nA sua aposta para o Jogos
      foi finalizada com os seguintes jogos e numeros: ${betsNum_arr} \n\n`,
      html: `Prezado(a) ${user.name}. <br><br> A sua aposta para o Jogo
      ${games_arr} foi finalizada, com os numeros: ${betsNum_arr} . <br><br>`,
    }

    await mailConfig.sendMail(message, (err) => {
      if (err) {
        return response.status(400)
      }
    })
    return response.status(201).send(`Aposta criada!`)
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
