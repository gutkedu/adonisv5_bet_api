import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/games', 'GamesController')
    .apiOnly()
    .middleware({
      store: ['auth', 'admin'],
      index: ['auth', 'admin'],
      show: ['auth', 'admin'],
      destroy: ['auth', 'admin'],
      update: ['auth', 'admin'],
    })
})
