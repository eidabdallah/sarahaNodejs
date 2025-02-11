import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAILADMIN,
            pass: process.env.PASSWORDSENDER,
        },
    });
    const info = await transporter.sendMail({
        from: `Saraha <${process.env.EMAILADMIN}>`,
        to,
        subject,
        html,
    });
}
