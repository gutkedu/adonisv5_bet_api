import { BaseTask } from 'adonis5-scheduler/build'
import User from '../Models/User'
import getWeekAndDays from '../../utils/getWeek'
import Bet from '../Models/Bet'
import kafkaConfig from 'Config/kafka'

export default class EmailUserToBet extends BaseTask {
  public static get schedule() {
    return '00 00 09 * * 1-5'
  }
  public static get useLock() {
    return false
  }
  public async handle() {
    this.logger.info('Task EmailUserToBet started!')
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

      if (sendMail === true) {
        const newEmailUserToBetProducer = kafkaConfig.producer()
        await newEmailUserToBetProducer.connect()
        await newEmailUserToBetProducer.send({
          topic: 'emails-emailUserToBet',
          messages: [
            {
              value: JSON.stringify({
                name: user.name,
                email: user.email,
              }),
            },
          ],
        })
        await newEmailUserToBetProducer.disconnect()

        this.logger.info(`Sent email to ${user.id}`)
        sendMail = false
      }
    }
  }
}
