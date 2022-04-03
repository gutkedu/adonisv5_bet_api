import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsersController')
    .apiOnly()
    .middleware({
      show: ['admin'],
      destroy: ['admin'],
      update: ['admin'],
    })
})
