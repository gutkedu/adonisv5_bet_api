const { Kafka, logLevel } = require('kafkajs')

const kafkaConfig = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
})

export default kafkaConfig
