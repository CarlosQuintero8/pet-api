import { User } from '../../../data';

export class VerifyEmailService {
  async execute(token: string) {
    try {
      // Buscar usuario por token de verificación
      const user = await User.findOne({ where: { verificationToken: token } });
      
      if (!user) {
        throw new Error('Invalid or expired verification token');
      }
      
      // Actualizar usuario
      user.isEmailVerified = true;
      user.verificationToken = null;
      await user.save();
      
      return { message: 'Email verified successfully' };
    } catch (error) {
      throw error;
    }
  }
}