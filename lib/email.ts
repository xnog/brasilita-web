import nodemailer from 'nodemailer';

/**
 * Configuração do transporte SMTP para AWS SES
 */
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
}

/**
 * Envia um email usando AWS SES via SMTP (nodemailer)
 */
export async function sendEmail({
    to,
    subject,
    html,
    from = 'noreply@brasilita.com',
    replyTo = 'contato@brasilita.com',
}: SendEmailParams) {
    try {
        to = 'xnogueira@gmail.com'
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
            replyTo,
        });

        console.log('Email sent successfully:', {
            messageId: info.messageId,
            to,
            subject,
        });

        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}
