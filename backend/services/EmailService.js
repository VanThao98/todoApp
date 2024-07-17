// EmailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const SendEmailService = async (email) => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure:false,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      }
    });
    const info = await transporter.sendMail({
        from: '"Levanthao 👻" <levanthaolvt228@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Send Email ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b style= 'color:red'>Tôi đang test Email Nodejs. Coi chừng tôi</b>", // html body
      });
    return info
}

export const SendEmailDeadline = async (email,subject, body) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    }
  });
  const info = await transporter.sendMail({
      from: '"Levanthao 👻" <levanthaolvt228@gmail.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: `<b style= 'color:red'>${body}</b>`, // html body
    });
  return info
}
// Create a transporter object using the default SMTP transport

// Function to send email
export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.email,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};
