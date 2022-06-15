import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/user_routes'
import 'App/Routes/game_routes'
import 'App/Routes/role_routes'
import 'App/Routes/user_roles_routes'
import 'App/Routes/bet_routes'
import 'App/Routes/userHandle_routes'
import 'App/Routes/test_kafka_routes'

Route.get('/', async () => {
  return { hello: 'World from Docker' }
})
