import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import UserDatabase from '../../src/services/user.register.database';
import { IUser } from '../../src/interfaces/user.interface';

const feature = loadFeature('tests/features/create-user-api.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let userDatabase: UserDatabase;

  beforeEach(() => {
    userDatabase = UserDatabase.getInstance("src/database/users.json");
    userDatabase.clear();
  });

  test('Criar um novo usuário com sucesso', ({ given, when, then, and }) => {
    given(/^não existe um usuário com nome "(.*)", email "(.*)", username "(.*)" e senha "(.*)" no banco de dados$/, (name, email, username, password) => {
      const existingUser = userDatabase.findByEmail(email);
      expect(existingUser).toBeUndefined();
    });
  
    when(/^uma requisição POST for enviada para "(.*)" com nome "(.*)", email "(.*)", username "(.*)" e senha "(.*)"$/, async (url, name, email, username, password) => {
      response = await request.post(url).send({
        name: name,
        email: email,
        username: username,
        password: password
      });
    });
  
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o JSON da resposta deve conter o nome "(.*)", email "(.*)", username "(.*)" e senha "(.*)" e uma mensagem de sucesso "(.*)"$/, (name, email, username, password, successMessage) => {
      expect(response.body.user.name).toBe(name);
      expect(response.body.user.email).toBe(email);
      expect(response.body.user.username).toBe(username);
      expect(response.body.user.password).toBe(password);
      expect(response.body.message).toBe(successMessage);
    });
  });
  
  test('Tentar criar um usuário com um email que já está registrado', ({ given, when, then, and }) => {
    given(/^existe um usuário com email "(.*)" no banco de dados$/, async (email) => {
      const existingUser: IUser = {
        name: 'João Silva',
        email: email,
        username: 'joao123',
        password: '123'
      };
      userDatabase.insert(existingUser);
    });
  
    when(/^uma requisição POST for enviada para "(.*)" com email "(.*)"$/, async (url, email) => {
      response = await request.post(url).send({
        email: email
      });
    });
  
    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^a resposta deve conter o detalhe "(.*)"$/, (detail) => {
      expect(response.body.message).toBe(detail);
    });
  }); 
});
