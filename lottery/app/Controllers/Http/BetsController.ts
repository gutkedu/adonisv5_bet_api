import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateBetValidator from 'App/Validators/CreateBetValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'
import Game from '../../Models/Game'
import Bet from '../../Models/Bet'
import kafkaConfig from 'Config/kafka'

export default class BetsController {
  public async index({ response }: HttpContextContract) {
    const Bets = await Bet.all()
    return response.status(200).json({ allBets: Bets })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await request.validate(CreateBetValidator)
    const { min_cart_value, user_bets } = request.body()
    const logged_user: any = auth.user
    console.log(logged_user.id)
    let cumulative_betPrice: number = 0
    const user = await User.find(logged_user.id)
    if (!user) return response.status(400).send({ error: 'Invalid user id' })

    for (const bet of user_bets) {
      const game = await Game.find(bet.game_id)
      if (!game) return response.status(400).send({ error: 'Invalid game id' })
      cumulative_betPrice += game.price
    }

    if (cumulative_betPrice >= min_cart_value) {
      for (const bet of user_bets) {
        const game = await Game.find(bet.game_id)
        if (!game) return response.status(400).send({ error: 'Invalid game id' })
        await user.related('games').attach({
          [game?.id]: {
            bet_numbers: bet.bet_numbers,
          },
        })
      }

      const newBetProducer = kafkaConfig.producer()
      await newBetProducer.connect()

      await newBetProducer.send({
        topic: 'emails-newBet',
        messages: [
          {
            value: JSON.stringify({
              name: user.name,
              email: user.email,
            }),
          },
        ],
      })
      await newBetProducer.disconnect()

      return response.status(201).json({ user, total_price: cumulative_betPrice, bets: user_bets })
    } else {
      return response.badRequest({
        error: `O valor total da aposta foi de R$${cumulative_betPrice}, menor que o minimo de R$${min_cart_value}.`,
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const user = await User.findOrFail(id)
      const bets = await Bet.query().where('user_id', user.id)
      return response.status(200).json({ userBets: bets })
    } catch {
      return response.badRequest({ error: 'Invalid user id' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    await request.validate({
      schema: schema.create({
        bet_numbers: schema.string({}),
      }),
    })
    try {
      const { bet_numbers } = request.body()
      const bet = await Bet.findByOrFail('id', id)
      await bet.merge({ bet_numbers: bet_numbers }).save()
      return response.status(200).json({ bet })
    } catch {
      return response.badRequest({ error: 'Invalid bet id' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const bet = await Bet.findByOrFail('id', id)
      await bet.delete()
      return response.status(200).json({ deleted_bet: bet })
    } catch {
      return response.badRequest({ error: 'Invalid bet id' })
    }
  }
}
