import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection:
    Application.nodeEnvironment === 'testing'
      ? Env.get('DB_CONNECTION_TEST')
      : Env.get('DB_CONNECTION'),


  connections: {
    mysql_test: {
      client: 'mysql',
      connection: {
        host: Env.get('MYSQL_HOST_TEST'),
        port: Env.get('MYSQL_PORT_TEST'),
        user: Env.get('MYSQL_USER_TEST'),
        password: Env.get('MYSQL_PASSWORD_TEST', ''),
        database: Env.get('MYSQL_DB_NAME_TEST'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
