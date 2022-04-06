import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/roles', 'RolesController')
    .apiOnly()
    .middleware({
      index: ['auth', 'admin'],
      show: ['auth', 'admin'],
      destroy: ['auth', 'admin'],
      update: ['auth', 'admin'],
    })
})
