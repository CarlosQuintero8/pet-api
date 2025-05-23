import jwt from 'jsonwebtoken';
import { envs } from '../../config';

export class JwtService {
  static generateToken(payload: object): string {
    
    return jwt.sign(payload, String(envs.JWT_SECRET), {
      expiresIn: envs.JWT_EXPIRES_IN
    });
  }

  static verifyToken<T = any>(token: string): T | null {
    try {
      
      return jwt.verify(token, String(envs.JWT_SECRET)) as T;
    } catch (error) {
      return null;
    }
  }
}