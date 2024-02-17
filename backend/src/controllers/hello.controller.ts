import { Router, Request, Response } from 'express';
import { SuccessResult } from '../utils/result';

class HelloController {
  private prefix: string = '/hello';
  public router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {

    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
      this.getHello(req, res)
    );

    this.router.post(`${this.prefix}`, (req: Request, res: Response) =>
      this.postHello(req, res)
    );
  }

  private async getHello(req: Request, res: Response) {
    return new SuccessResult({
      msg: 'Hello World',
      data: null,
    }).handle(res);
  }
  private async postHello(req: Request, res: Response) {
    return new SuccessResult({
      msg: 'Hello World',
      data: req.body,
    }).handle(res);
  }

}

export default HelloController;
