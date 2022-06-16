import Env from '@ioc:Adonis/Core/Env'

const nodemailer = require('nodemailer')

const mailConfig = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: Env.get('MAILTRAP_USER'),
    pass: Env.get('MAILTRAP_PASS'),
  },
})

export default mailConfig
