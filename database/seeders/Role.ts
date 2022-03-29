import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'privilege'

    await Role.updateOrCreateMany(uniqueKey, [
      {
        privilege: 'Player',
        description: 'Jogador'
      },
      {
        privilege: 'Admin',
        description: 'Privilegio de administrador'
      }
    ])
  }
}

