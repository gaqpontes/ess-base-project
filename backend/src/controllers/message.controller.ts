import { Router, Request, Response } from 'express';
import { SuccessResult } from '../utils/result';
import { IMessage } from '../interfaces/chat.interface';
import { messageModel } from '../models/chat.model';


class MessageController {
    private prefix: string = '/messages';
    public router: Router;

    constructor(router: Router) {
    this.router = router;
    this.initRoutes();
    }

    private initRoutes() {    
    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
    this.getMessage(req, res));

    this.router.post(`${this.prefix}`, (req: Request, res: Response) =>
    this.postMessage(req, res));

    this.router.post(`${this.prefix}/upload`, (req: Request, res: Response) =>
    this.postFile(req, res));
    }

  private async getMessage(req: Request, res: Response){
    return new SuccessResult({
      msg: 'Hello World',
      data: null,
    }).handle(res);
  }

  private async postMessage(req: Request, res: Response){
    const { name, message } = req.body;
    return new SuccessResult({
        msg: 'Message sent successfully',
        data: {name, message},
      }).handle(res);
  }

  private async postFile(req: Request, res: Response){
    const { name, content } = req.body;
    return new SuccessResult({
        msg: 'File sent successfully',
        data: {name, content},
    }).handle(res);
}
}

export default MessageController;