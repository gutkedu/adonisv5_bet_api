import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        name: 'UsuarioTeste',
        email: 'teste@adonisjs.com',
        password: '123456',
      },
      {
        name: 'Usuario Seed',
        email: 'seeder@adonisjs.com',
        password: '123456',
      },
    ])
  }
}
