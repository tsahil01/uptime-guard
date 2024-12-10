import { smtpHost, smtpPassword } from ".";

const nodemailer = require('nodemailer');

export async function sendEmail(to: string, subject: string, html: string) {
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpHost,
            pass: smtpPassword
        }
    });

    const mailOptions = {
        from: '"Uptime Guard" <uptimeguard@sahiltiwaskar.tech>',
        to: to,
        subject: subject,
        text: html,
        html: html
    };

    await transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log("Error sending email: ", error);
            return false
        }
        console.log('Message sent: %s', info.messageId);
        return true
    });

}
