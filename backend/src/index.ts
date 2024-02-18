import app from './app';
import logger from './logger';
import Env from './env';
import http from 'http';
import server from './server';

app.listen(Env.PORT, () => {
  logger.info(`Server started on http://localhost:${Env.PORT}/api`);
});

server.listen(4000, () => {
  console.log("Message server running");
});
    
