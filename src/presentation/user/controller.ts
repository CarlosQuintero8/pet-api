import { Request, Response } from 'express';
import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { DeleteUserService } from './services/delete-user.service';

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService = new FinderUserService(),
    private readonly deleteUserService: DeleteUserService = new DeleteUserService()
  ) {}

  register = (req: Request, res: Response) => {
    this.creatorUserService
      .execute(req.body)
      .then((user) => res.status(201).json(user))
      .catch((error) => res.status(500).json({ message: error.message || 'internal server error' }));
  };

  login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    this.loginUserService
      .execute(email, password)
      .then((data) => res.status(200).json(data))
      .catch((error) => {
        if (error.message === 'Invalid credentials') {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (error.message === 'Email not verified') {
          return res.status(403).json({ message: 'Please verify your email before logging in' });
        }
        return res.status(500).json({ message: 'internal server error' });
      });
  };

  findAllUsers = (req: Request, res: Response) => {
    this.finderUserService
      .executeByFindAll()
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService
      .executeByFindOne(id)
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    this.deleteUserService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        if (error.message === 'User not found') {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.status(500).json({ message: 'internal server error' });
      });
  };
}