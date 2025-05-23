import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { VerifyEmailService } from './services/verify-email.service';
import { Router } from 'express';
import { UserController } from './controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const creatorUserService = new CreatorUserService();
    const loginUserService = new LoginUserService();
    const finderUserService = new FinderUserService();
    const verifyEmailService = new VerifyEmailService();
    const controller = new UserController(creatorUserService, loginUserService, finderUserService);

    // Rutas públicas
    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/verify-email/:token', (req, res) => {
      const { token } = req.params;
      
      verifyEmailService
        .execute(token)
        .then((result) => res.status(200).json(result))
        .catch((error) => {
          if (error.message === 'Invalid or expired verification token') {
            return res.status(400).json({ message: error.message });
          }
          return res.status(500).json({ message: 'internal server error' });
        });
    });
    
    // Rutas protegidas para administradores
    router.get('/', [authMiddleware, adminMiddleware], controller.findAllUsers);
    router.get('/:id', [authMiddleware, adminMiddleware], controller.findOne);
    router.delete('/:id', [authMiddleware, adminMiddleware], controller.deleteUser);

    return router;
  }
}