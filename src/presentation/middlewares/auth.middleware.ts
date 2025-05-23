import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../domain/services/jwt.service';
import { User } from '../../data';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtener el token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No se proporcionó un token' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar el token
    const decoded = JwtService.verifyToken(token) as { id: string };
    
    if (!decoded) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    // Buscar el usuario
    const user = await User.findOne({ where: { id: decoded.id } });
    
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar si el email está verificado
    if (!user.isEmailVerified) {
      return res.status(403).json({ message: 'El correo no está verificado' });
    }
    
    // Añadir el usuario a la request
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Fallo en la autenticación' });
  }
};