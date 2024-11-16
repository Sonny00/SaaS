import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com', // Remplacez par l'hôte SMTP
      port: 587,                // Remplacez par le port approprié, ex: 587 pour TLS
      secure: false,            // Remplacez par `true` si vous utilisez SSL
      auth: {
        user: 'sonnyjudo@hotmail.fr', // Remplacez par votre email
        pass: 'Kyorado24',      // Remplacez par votre mot de passe
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const mailOptions = {
        from: 'sonnyjudo@hotmail.fr', // Adresse "from" (émetteur)
        to,                              // Adresse de réception
        subject,
        text,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email envoyé : ${info.messageId}`);
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’email :', error);
      throw new Error('Erreur lors de l’envoi de l’email');
    }
  }
}
