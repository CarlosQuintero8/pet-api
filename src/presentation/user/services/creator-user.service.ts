import { User } from '../../../data';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '../../../domain/services/email.service';

export class CreatorUserService {
  async execute(data: any) {
    const user = new User();

    user.name = data.name.trim().toLowerCase();
    user.email = data.email.trim().toLowerCase();
    user.password = data.password.trim();
    user.isEmailVerified = false;
    user.verificationToken = uuidv4();

    try {
      await user.save();
      
      // Enviar email de verificación
      await EmailService.sendVerificationEmail(user.email, user.verificationToken);
      
      // No devolver el token de verificación ni la contraseña
      const { password, verificationToken, ...userWithoutSensitiveInfo } = user;
      
      return userWithoutSensitiveInfo;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}