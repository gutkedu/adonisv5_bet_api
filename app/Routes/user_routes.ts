import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsersController')
    .apiOnly()
    .middleware({
      index: ['auth', 'admin'],
      show: ['auth', 'admin'],
      destroy: ['auth', 'admin'],
      update: ['auth', 'admin'],
    })
})
