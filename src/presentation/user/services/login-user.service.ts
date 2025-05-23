import { User } from '../../../data';
import { JwtService } from '../../../domain/services/jwt.service';

export class LoginUserService {
  async execute(email: string, password: string) {
    try {
      // Buscar usuario por email
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      
      // Verificar contraseña
      const isPasswordValid = await user.validatePassword(password);
      
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
      
      // Verificar si el email está verificado

      if (!user.isEmailVerified) {
        throw new Error('Email not verified');
      }
      
      // Generar token JWT incluyendo el rol
      const token = JwtService.generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });
      
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}