import { BaseTask } from 'adonis5-scheduler/build'
import User from '../Models/User'
import getWeekAndDays from '../../utils/getWeek'
import Bet from '../Models/Bet'
import mailConfig from 'Config/mail'

export default class EmailUserToBet extends BaseTask {
  public static get schedule() {
    return '00 00 09 * * 1-5'
  }
  public static get useLock() {
    return false
  }
  public async handle() {
    const today = new Date()
    let sendMail: boolean = false
    const ActualWeekAndDays = getWeekAndDays(today)
    const users = await User.all()

    for (const user of users) {
      const user_bets = await Bet.query().where('user_id', user.id)
      for (const bet of user_bets) {
        let bet_date: any = new Date(bet.createdAt.year, bet.createdAt.month - 1, bet.createdAt.day)
        const betWeekAndDays = getWeekAndDays(bet_date)
        if (betWeekAndDays.numberOfDays < ActualWeekAndDays.numberOfDays - 7) {
          sendMail = true
        }
      }
      const message = {
        from: 'noreplay@luby.software.com',
        to: `${user.email}`,
        subject: 'Realize sua aposta na Bet Api',
        text: `Prezado(a) ${user.name}. \n\n Você não ordenou nenhuma aposta
        em uma semana. Venha apostar conosco novamente!\n\n`,
        html: `Prezado(a) ${user.name}. <br><br> Você não ordenou nenhuma aposta
        em uma semana. Venha apostar conosco novamente!<br><br>`,
      }
      if (sendMail === true) {
        await mailConfig.sendMail(message, () => {})
        sendMail = false
      }
    }
  }
}
