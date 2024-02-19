import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import logger from './logger';
import setupRoutes from './routes/index';
import { HttpError } from './utils/errors/http.error';
import { FailureResult } from './utils/result';
import Database from './database';
import ContactsDatabase from './database/contacts.database';
import userRoutes from './routes/user.route';
import loginRouter from './routes/user_login.route'; 
import updateRouter from './routes/update.route';
import deleteRouter from './routes/delete.user.router';

const app: express.Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: '*',
  })
);

setupRoutes(app);

// Adicione as rotas do usuário à aplicação
app.use('/api/users', userRoutes);
app.use('/api/users', loginRouter);
app.use('/api/users', updateRouter); 
app.use('/api/users', deleteRouter); 


// Rota para obter lista de contatos
app.get('/api/contacts', async (req, res, next) => {
  try {
    const contactsDatabase = ContactsDatabase.getInstance();
    const listContacts = contactsDatabase.getAllContacts(); // Método a ser implementado para obter todos os contatos do banco de dados

    res.json(listContacts);
  } catch (error) {
    next(error);
  }
});

// Rota para obter informações de um contato específico
app.get('/api/contacts/:id/info', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactsDatabase = ContactsDatabase.getInstance();
    const contact = contactsDatabase.getContactById(contactId); // Implemente o método getContactById na classe ContactsDatabase

    if (!contact) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

//Rota para deletar um contato ainda nn pega
app.delete('/api/contacts/:id/info/delete', async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contactsDatabase = ContactsDatabase.getInstance();
    contactsDatabase.deleteContact(contactId); // Chama o método deleteContact passando o ID do contato a ser deletado
    contactsDatabase.deleteContact(contactId);

    res.sendStatus(204); // Retorna 204 No Content para indicar que o contato foi deletado com sucesso
  } catch (error) {
    next(error);
  }
});


app.use(
  (
    error: HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (error.status >= 500) {
      logger.error(error.toString());
    }

    new FailureResult({
      msg: error.msg ?? error.message,
      msgCode: error.msgCode,
      code: error.status,
    }).handle(res);
  }
);

// e.g. Seed database with initial data;
Database.seed();

export default app;
