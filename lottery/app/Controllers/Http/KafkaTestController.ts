// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import kafkaConfig from 'Config/kafka'

export default class KafkaTestController {
  public async store({ request, response }: HttpContextContract) {
    const { message } = request.body()
    console.log('Kafka Connected')
    const producer = kafkaConfig.producer()
    await producer.connect()
    await producer.send({
      topic: 'emails-topic',
      messages: [{ value: message }],
    })
    await producer.disconnect()
    return response.status(200).send('Producer criado!')
  }
}
