import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Games extends BaseSchema {
  protected tableName = 'games'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.integer('range').unsigned().notNullable()
      table.integer('price').unsigned().notNullable()
      table.integer('max_number').unsigned().notNullable()
      table.string('color').notNullable()
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
