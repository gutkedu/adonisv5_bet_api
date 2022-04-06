import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/games', 'GamesController')
    .apiOnly()
    .middleware({
      destroy: ['auth', 'admin'],
      update: ['auth', 'admin']
    })
})
