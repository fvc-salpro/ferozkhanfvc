import nodemailer from 'nodemailer';

export const sendNotificationEmail = async (
    to: string[],
    subject: string,
    html: string,
    attachments: { filename: string; content: Buffer }[]
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to.join(', '),
        subject,
        html,
        attachments,
    };

    await transporter.sendMail(mailOptions);
};