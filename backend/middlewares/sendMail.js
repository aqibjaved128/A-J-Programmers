const mailer = require('nodemailer');

const sendEmail = async (options) => {

    const transporter = mailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from:options.email,
        to:process.env.SMTP_MAIL,
        subject:options.subject,
        text:options.sendMessage

    };

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;