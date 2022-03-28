import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const user = await User.all()
    return response.status(200).send(user)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = request.body();
    const searchPayload = { email: email }
    const savePayload = {
      name: name,
      password: password,
    }
    await User.firstOrCreate(searchPayload, savePayload)
    return response.status(201);
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const user = await User.findOrFail(id)
    return response.status(200).send(user)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { name, email } = request.body();
    const user = await User.findOrFail(id);
    await user
      .merge({
        name: name,
        email: email,
      })
      .save()
    return response.status(200).send(user)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const user = await User.findOrFail(id)
    await user.delete()
    return response.status(202).send(user)
  }
}
