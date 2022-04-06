import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/roles', 'RolesController')
    .apiOnly()
    .middleware({
      show: ['auth', 'admin'],
      destroy: ['auth', 'admin'],
      update: ['auth', 'admin'],
    })
})
