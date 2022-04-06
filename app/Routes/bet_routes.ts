import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/bets', 'BetsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      destroy: ['auth', 'admin'],
      update: ['auth', 'admin']
    })
})

