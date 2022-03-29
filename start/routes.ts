import Route from '@ioc:Adonis/Core/Route'
import 'App/modules/User/user_routes'
import 'App/modules/Game/game_routes'
import 'App/modules/Role/role_routes'
import 'App/modules/UserRoles/user_roles_routes'

Route.get('/', async () => {
  return { hello: 'World from Docker' }
})


