import nodemailer from 'nodemailer';
import { envs } from '../../config';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    service: envs.EMAIL_SERVICE,
    auth: {
      user: envs.EMAIL_USER,
      pass: envs.EMAIL_PASSWORD,
    },
  });

  static async sendVerificationEmail(email: string, token: string): Promise<boolean> {
    const verificationUrl = `${envs.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: envs.EMAIL_FROM,
      to: email,
      subject: 'Verifica tu cuenta',
      html: `
        <h1>Bienvenido a nuestra plataforma</h1>
        <p>Por favor, haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationUrl}">Verificar mi cuenta</a>
        <p>Este enlace expirará en 24 horas.</p>
      `,
    };

    try {
      await EmailService.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}