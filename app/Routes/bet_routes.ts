import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/newbet', 'BetsController.store')
    .middleware(['auth'])
  Route.delete('/removebet', 'BetsController.destroy')
    .middleware(['auth', 'admin'])
})
