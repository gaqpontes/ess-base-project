import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import HelloController from '../controllers/hello.controller';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
  app.use(
    prefix,
    new UserController(router, di.getService(UserService)).router
  );
  app.use(
    prefix,
    new HelloController(router).router
  );
};
