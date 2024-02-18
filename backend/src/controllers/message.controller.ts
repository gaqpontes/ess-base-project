import { Router, Request, Response } from 'express';
import { SuccessResult } from '../utils/result';
import MessagesDatabase from '../database/message.database';
import { IMessage } from '../interfaces/chat.interface';

class MessageController {
  private prefix: string = '/messages';
  public router: Router;
  private database: MessagesDatabase = MessagesDatabase.getInstance();

  constructor(router: Router) {
  this.router = router;
  this.initRoutes();
  }

  private initRoutes() {    
    this.router.get(`${this.prefix}/:sender`, (req: Request, res: Response) =>
    this.getMessage(req, res));

    this.router.post(`${this.prefix}`, (req: Request, res: Response) =>
    this.postMessage(req, res));

    this.router.post(`${this.prefix}/upload`, (req: Request, res: Response) =>
    this.postFile(req, res));
  }

  private async getMessage(req: Request, res: Response){
    const sender = req.params.sender;

    const messages = this.database.getMessagesByParticipant(sender);

    return new SuccessResult({
      msg: 'Sucessfull get',
      data: messages,
    }).handle(res);
  }

  private async postMessage(req: Request, res: Response){
    const { name, message } = req.body;
    const info = { name, message };
    
    const messageSent: IMessage = {
      sender: info.name,
      content: info.message
    }

    this.database.addMessage(messageSent);

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