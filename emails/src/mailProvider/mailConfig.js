import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailConfig = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export { mailConfig };
