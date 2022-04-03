const nodemailer = require('nodemailer')

const mailConfig = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '593318f912ee82',
    pass: '2449ae2accd0f8',
  },
})

export default mailConfig
