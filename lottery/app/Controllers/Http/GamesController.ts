import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Game from 'App/Models/Game'
import CreateGameValidator from 'App/Validators/CreateGameValidator'

export default class GamesController {
  public async index({ response }: HttpContextContract) {
    const games = await Game.all()
    return response.status(200).json({ min_cart_value: 30, games })
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateGameValidator)
    const { type, description, range, price, max_number, color } = request.body()
    const searchPayload = { type: type }
    const savePayload = {
      description: description,
      range: range,
      price: price,
      max_number: max_number,
      color: color,
    }
    const game = await Game.firstOrCreate(searchPayload, savePayload)
    return response.status(201).json(game)
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const games = await Game.findOrFail(id)
      return response.status(200).json(games)
    } catch {
      return response.badRequest({ error: 'Invalid game id' })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    await request.validate(CreateGameValidator)
    const { type, description, range, price, max_number, color } = request.body()
    try {
      const games = await Game.findOrFail(id)
      await games
        .merge({
          type: type,
          description: description,
          range: range,
          price: price,
          max_number: max_number,
          color: color,
        })
        .save()
      return response.status(200).json(games)
    } catch (error) {
      return response.badRequest({ error: 'Invalid game id' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const game = await Game.findOrFail(id)
      await game.delete()
      return response.status(200).json({ deleted_game: game })
    } catch {
      return response.badRequest({ error: 'Invalid game id' })
    }
  }
}
