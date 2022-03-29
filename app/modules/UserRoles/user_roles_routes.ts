import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/assign', 'UserRolesController.assign')
  Route.delete('/dismiss', 'UserRolesController.dissmiss')
})
