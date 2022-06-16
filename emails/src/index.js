import { Kafka, logLevel } from "kafkajs";
import { mailConfig } from "./mailProvider/mailConfig.js";

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
  await consumer.subscribe({ topic: "emails-newUser", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value);
      console.log(payload);

      const mailMessage = {
        from: "noreplay@luby.software.com",
        to: `${payload.email}`,
        subject: "Cadastro finalizado na plataforma de apostas.",
        text: `Prezado(a) ${payload.name}. \n\nO seu cadastro foi
      finalizado.\n\n`,
        html: `Prezado(a) ${payload.name}. <br><br> O seu cadastro foi
      finalizado. <br><br>`,
      };

      await mailConfig.sendMail(mailMessage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    },
  });
}

run().catch(console.error);
