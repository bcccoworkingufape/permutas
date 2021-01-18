import nodemailer from 'nodemailer';

import mailConfig from '../../config/mail';

export default async function sendMail(recipients, subject, body) {
  try {
    await nodemailer.createTestAccount();
    const config = {
      host: mailConfig.host,
      port: mailConfig.port,
      secure: false,
      auth: {
        user: mailConfig.email,
        pass: mailConfig.pass,
      },
    };
    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: `Permutas <${mailConfig.email}>`, // sender address
      to: recipients,
      subject,
      html: body,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (err) {
    console.log(err);
    console.log('erro ao enviar email');
    return err;
  }
}
