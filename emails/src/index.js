import { kafkaConfig } from "./providers/kafkajs/kafkaConfig.js";
import { mailConfig } from "./providers/nodemailer/mailConfig.js";

async function run() {
  const newUserConsumer = kafkaConfig.consumer({
    groupId: "emails-newUserGroup",
  });
  const forgotPasswordConsumer = kafkaConfig.consumer({
    groupId: "emails-forgotPasswordGroup",
  });
  const newBetConsumer = kafkaConfig.consumer({
    groupId: "emails-newBetGroup",
  });
  const newEmailUserToBetConsumer = kafkaConfig.consumer({
    groupId: "emails-emailUserToBetGroup",
  });

  await newUserConsumer.connect();
  await forgotPasswordConsumer.connect();
  await newBetConsumer.connect();
  await newEmailUserToBetConsumer.connect();

  await newUserConsumer.subscribe({
    topic: "emails-newUser",
  });
  await forgotPasswordConsumer.subscribe({
    topic: "emails-forgotPassword",
  });
  await newBetConsumer.subscribe({
    topic: "emails-newBet",
  });
  await newEmailUserToBetConsumer.subscribe({
    topic: "emails-emailUserToBet",
  });

  await newUserConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value);
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

  await forgotPasswordConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value);
      const mailMessage = {
        from: "noreplay@luby.software.com",
        to: `${payload.email}`,
        subject: "Bet api - Recuperação de senha",
        text: `Prezado(a) ${payload.name}. \n\nParece que você solicitou uma
        recuperação de senha, caso queria prosseguir clique no link abaixo:\n\n
        http://localhost:3333/reset/${payload.rememberMeToken}, \n\n
        Caso não tenha sido você quem fez a solicitação,favor descartar o e-mail.`,
        html: `Prezado(a) ${payload.name}. <br><br> Parece que você solicitou uma
        recuperação de senha, caso queria prosseguir clique no link abaixo:
        <br><br> <a href="http://localhost:3333/reset/${payload.rememberMeToken}">
         Recuperar senha </a> <br><br>Caso não tenha sido você quem fez a
         solicitação, favor descartar o e-mail.`,
      };
      await mailConfig.sendMail(mailMessage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    },
  });

  await newBetConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value);

      const mailMessage = {
        from: "noreplay@luby.software.com",
        to: `${payload.email}`,
        subject: "Aposta relizada na Bet API.",
        text: `Prezado(a) ${payload.name}. \n\nA sua aposta foi finalizada,
          confira no site para informações mais detalhadas. \n\n`,
        html: `Prezado(a) ${payload.name}. <br><br> A sua aposta foi finalizada,
          confira no site para informações mais detalhadas. <br><br>`,
      };
      await mailConfig.sendMail(mailMessage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    },
  });

  await newEmailUserToBetConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = JSON.parse(message.value);

      const mailMessage = {
        from: "noreplay@luby.software.com",
        to: `${payload.email}`,
        subject: "Realize sua aposta na Bet Api",
        text: `Prezado(a) ${payload.name}. \n\n Você não ordenou nenhuma aposta
        em uma semana. Venha apostar conosco novamente!\n\n`,
        html: `Prezado(a) ${payload.name}. <br><br> Você não ordenou nenhuma aposta
        em uma semana. Venha apostar conosco novamente!<br><br>`,
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
