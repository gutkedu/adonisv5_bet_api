import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/assign', 'UserRolesController.store')
  Route.delete('/dismiss', 'UserRolesController.destroy')
})
