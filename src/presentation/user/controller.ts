import { Request, Response } from 'express';
import { CreatorUserService } from './services/creator-user.service';
import { LoginUserService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService = new FinderUserService()
  ) {}

  register = (req: Request, res: Response) => {
    this.creatorUserService
      .execute(req.body)
      .then((user) => res.status(201).json(user))
      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  };

  login = (req: Request, res: Response) => {
    this.loginUserService
      .execute() // Assuming execute method takes necessary parameters from req.body
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(500).json({ message: 'internal server error' }));
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
}