import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UserAdminSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      name: 'Usuario admin',
      email: 'admin@adonisjs.com',
      password: 'admin',
    })
    const role_admin = await Role.findByOrFail('privilege', 'Admin')
    await user.related('roles').attach([role_admin.id])
    const role_player = await Role.findByOrFail('privilege', 'Player')
    await user.related('roles').attach([role_player.id])
  }
}
