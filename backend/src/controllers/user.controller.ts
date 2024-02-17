import { Router, Request, Response } from 'express';
import { SuccessResult } from '../utils/result';
import UserService from '../services/user.service';
import UserEntity from '../entities/user.entity';

class UserController {
  private prefix: string = '/user';
  private userService: UserService;
  public router: Router;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes() {

    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
      this.getUser(req, res)
    );

    this.router.post(`${this.prefix}`, (req: Request, res: Response) =>
      this.postUser(req, res)
    );
    this.router.post(`${this.prefix}/auth`, (req: Request, res: Response) =>
      this.authUser(req, res)
    );
    this.router.post(`${this.prefix}/password-reset`, (req: Request, res: Response) =>
      this.updateUserPassword(req, res)
    );
  }

  private async getUser(req: Request, res: Response) {
    return new SuccessResult({
      msg: 'GET USER',
      data: null,
    }).handle(res);
  }
  private async authUser(req: Request, res: Response) {
    const user = await this.userService.authenticateUser(req.body);
    return new SuccessResult({
      msg: 'AUTH USER',
      data: user
    }).handle(res);
  }
  private async postUser(req: Request, res: Response) {
    const user = await this.userService.createUser(new UserEntity(req.body));
    return new SuccessResult({
      msg: 'POST USER',
      data: user,
    }).handle(res);
  }
  private async updateUserPassword(req: Request, res: Response) {
    const user = await this.userService.resetPassword(req.body);
    return new SuccessResult({
      msg: 'UPDATE USER PASSWORD',
      data: user,
    }).handle(res);
  }

}

export default UserController;
