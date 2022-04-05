import User from "App/Models/User";
const CronJob = require('cron').CronJob;

let cronJob = new CronJob('00 00 09 * * 1-5', async function () {
  const d = new Date().toLocaleString("en-US",
    { timeZone: "America/Sao_Paulo" });
  console.log('Cron ativado em:', d);
  const users = await User.all();
  users.forEach((user) => {

  })
}, 'America/Sao_Paulo');
//cronJob.start();

export default cronJob
