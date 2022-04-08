import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      name: 'Usuario teste',
      email: 'teste@adonisjs.com',
      password: '123456',
    })
    const role = await Role.findByOrFail('privilege', 'Player')
    await user.related('roles').attach([role.id])
  }
}


