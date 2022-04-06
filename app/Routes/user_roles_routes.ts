import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/assign', 'UserRolesController.store')
    .middleware(['auth', 'admin'])
  Route.delete('/dismiss', 'UserRolesController.destroy')
    .middleware(['auth', 'admin'])
})
