import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bets extends BaseSchema {
  protected tableName = 'bets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      table.uuid('game_id').references('games.id').onDelete('CASCADE')
      table.unique(['user_id', 'game_id'])
      table.string('bet_numbers').notNullable()
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
