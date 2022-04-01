import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/newbet', 'BetsController.store')
  Route.delete('/removebet', 'BetsController.destroy')
})
