const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:29092"],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

async function run() {
  const consumer = kafka.consumer({ groupId: "emails-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "emails-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}

run().catch(console.error);
