import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game';
import User from 'App/Models/User';

export default class BetsController {
  public async store({ request, response }: HttpContextContract) {
    const { user_id, gameType, bet_numbers } = request.body();
    const user = await User.findOrFail(user_id);
    const game = await Game.findByOrFail('type', gameType);

    await user.related('games').attach({
      [game.id]: {
        bet_numbers: bet_numbers
      }
    })
    return response.status(201).send(`Aposta do jogo ${gameType} criada!`)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { user_id, gameType } = request.body();
    const user = await User.findOrFail(user_id);
    const game = await Game.findByOrFail('type', gameType);
    await user.related('games').detach([game.id])
    return response.status(200).send(`Aposta do jogo ${gameType} deletada`)
  }
}
