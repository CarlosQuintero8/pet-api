import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { Router } from 'express';
import { UserController } from './controller'; // Assuming UserController exists

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const creatorUserService = new CreatorUserService();
    const loginUserService = new LoginUserService();
    const finderUserService = new FinderUserService();
    const controller = new UserController(creatorUserService, loginUserService, finderUserService);

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/', controller.findAllUsers);
    router.get('/:id', controller.findOne);

    return router;
  }
}