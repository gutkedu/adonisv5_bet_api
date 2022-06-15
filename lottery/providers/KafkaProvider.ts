import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
const { Kafka, logLevel } = require('kafkajs')

export default class KafkaProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:29092'],
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    })
    console.log('Kafka Connected')
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'emails-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    })
    await producer.disconnect()
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
