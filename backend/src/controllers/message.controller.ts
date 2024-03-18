import { Router, Request, Response } from 'express';
import { FailureResult, SuccessResult } from '../utils/result';
import MessagesDatabase from '../database/message.database';
import NotificationsDatabase from '../database/notifications.database';
import { IMessage } from '../interfaces/chat.interface';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';

class MessageController {
  private prefix: string = '/messages';
  public router: Router;
  private database: MessagesDatabase = MessagesDatabase.getInstance();
  private notificationsDatabase: NotificationsDatabase = NotificationsDatabase.getInstance();

  public storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, './src/upload/');
    },
    filename: function (req, file, cb) {
      const customName = req.body.customName;
      const fileExtension = path.extname(file.originalname);
      const newFileName = customName + fileExtension;
      cb(null, newFileName);
    },
  });
   
  public uploadMedia = multer({ storage: this.storage });

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {    
    this.router.get(`${this.prefix}/get/:firstUser/:secondUser`, (req: Request, res: Response) =>
    this.getMessage(req, res));

    this.router.post(`${this.prefix}/send/:sender/:receiver/upload/`, (req: Request, res: Response) =>
    this.getMedia(req, res));

    this.router.post(`${this.prefix}/send/:sender/:receiver`, (req: Request, res: Response) =>
    this.postMessage(req, res));

    this.router.post(`${this.prefix}/send/:sender/:receiver/upload/:path`, (req: Request, res: Response) =>
    this.postFile(req, res));

    this.router.delete(`${this.prefix}/delete/:sender/:receiver/:id`, (req: Request, res: Response) =>
    this.deleteMessage(req, res));

    this.router.post(`${this.prefix}/upload`, this.uploadMedia.single('file'), (req, res) => {
      console.log('File received:', req.file);
      res.sendStatus(200);
     });
  }

  private async getMessage(req: Request, res: Response){
    const sender = req.params.firstUser;
    const receiver = req.params.secondUser;

    const messages = this.database.getConversation(sender, receiver);

    if (messages) {
      return new SuccessResult({
        msg: 'Messages found successfully',
        data: messages,
      }).handle(res);
    } else {
      return new FailureResult({
        msg: "No messages exchanged"
      }).handle(res);
    }
  }

  private async getMedia(req: Request, res: Response){
    const sender = req.params.firstUser;
    const receiver = req.params.secondUser;

    const messages = this.database.getMediaConversation(sender, receiver);

    if (messages) {
      return new SuccessResult({
        msg: 'Medias found successfully',
        data: messages,
      }).handle(res);
    } else {
      return new FailureResult({
        msg: "No medias exchanged"
      }).handle(res);
    }
  }

  private async deleteMessage(req: Request, res: Response) {
    const messageId = req.params.messageId;
    const messageSent = this.database.getMessage(messageId)

    if (!messageSent?.id) {
      return new FailureResult({
          msg: 'Message not found',
      }).handle(res);
    }
    
    if (messageSent?.sender === req.params.sender) {
      const success = this.database.deleteMessage(messageId);
      if (success) {
        return new SuccessResult({
            msg: 'Message deleted successfully',
        }).handle(res);
      }
    } else {
      return new FailureResult({
        msg: 'Message not sent by you',
      }).handle(res);
    }

}

  private async postMessage(req: Request, res: Response){
    const { message } = req.body;
    const sender = req.params.sender
    const receiver = req.params.receiver
    const messageId = uuidv4();

    const timestampNumber = Date.now();

    const messageSent: IMessage = {
      id: messageId,
      sender: sender,
      content: message,
      receiver: receiver,
      media: false,
      timestamp: new Date(timestampNumber)
    }

    this.database.addMessage(messageSent);
    // Adiciona a notificação ao banco de dados de notificações
    this.notificationsDatabase.addNotification(messageSent);    
    console.log(this.database);

    return new SuccessResult({
        msg: 'Message sent successfully',
        data: { sender, message, receiver, messageId},
      }).handle(res);
  }

  private async postFile(req: Request, res: Response) {
    const filePath = `./src/upload/${req.params.path}`;
    const fileExtension = filePath.split('.').pop();
    
    if (fileExtension) {
     const mimeTypeMapping: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'ogg': 'video/ogg',
      'pdf': 'application/pdf',
      'mp3': 'audio/mpeg',
     };
     const mimeType = mimeTypeMapping[fileExtension] || 'application/octet-stream';
           
    fs.readFile(filePath, 'base64', (err, data) => {
       if (err) {
         console.error('Error reading file:', err);
         return;
       }
       const sender = req.params.sender;
       const receiver = req.params.receiver;
       const messageId = uuidv4();
       const fileSizeInBytes = Buffer.byteLength(data, 'base64');
       const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
       const timestampNumber = Date.now();
   
       if (fileSizeInMB > 5) {
         return new FailureResult({
           msg: 'Maximum file size exceeded',
         }).handle(res);
       } else {
         const messageSent: IMessage = {
           id: messageId,
           sender: sender,
           content: `data:${mimeType};base64,${data}`,
           receiver: receiver,
           media: true,
           timestamp: new Date(timestampNumber),
         };
   
         this.database.addMessage(messageSent);
   
         return new SuccessResult({
           msg: 'File sent successfully',
           data: { sender, data, receiver, messageId, mimeType },
         }).handle(res);
       }   
    });
}
}}

export default MessageController;