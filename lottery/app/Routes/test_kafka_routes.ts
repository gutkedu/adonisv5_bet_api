import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/testkafka', 'KafkaTestController.store')
})
