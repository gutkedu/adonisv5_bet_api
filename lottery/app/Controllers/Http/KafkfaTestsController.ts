// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kafka from 'kafkajs'

export default class KafkfaTestsController {
  public async store({ request, response }: HttpContextContract) {
    return response.status(200).send('Producer criado!')
  }
}
