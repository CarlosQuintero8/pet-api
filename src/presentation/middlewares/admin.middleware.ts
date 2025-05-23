import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../data/postgres/models/user.model';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // El usuario ya debe estar autenticado por el authMiddleware
  const user = req.user;
  
  if (!user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (user.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
  
  next();
};