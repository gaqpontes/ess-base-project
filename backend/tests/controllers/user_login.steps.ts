import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import {authenticateUser, } from '../../src/services/login.service';
import UserDatabase from '../../src/services/user.register.database';
import { IUser } from '../../src/interfaces/user.interface';
import { url } from 'inspector';

const feature = loadFeature('tests/features/user_login.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;

  test('Login bem-sucedido', ({ given, when, then, and }) => {
    given(/^um usuário existente no banco de dados com email "(.*)" e senha "(.*)"$/, async () => {
      
    });

    when(/^uma requisição POST é enviada para "(.*)" com email "(.*)" e senha "(.*)"$/, async (url,email,password) => {
      response = await request.post(url).send({
        email: email,
        password: password
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta JSON deve conter "(.*)"$/, (message) => {
      expect(response.body.message).toBe(message);
    });
  });

  test('Falha no login devido a credenciais não existentes no banco', ({ given, when, then, and }) => {
    given(/^um usuário com email "(.*)" e senha "(.*)" não está cadastrado no banco$/, async (email,password) => {
      const exists = await authenticateUser(email, password);
      expect(exists).toBeFalsy();
    });

    when(/^uma requisição POST é enviada para "(.*)" com email "(.*)" e senha "(.*)"$/, async (url,email,password) => {
      response = await request.post(url).send({
        email: email,
        password: password
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
        expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and('a resposta deve conter o detalhe "Invalid email or password"', () => {
      expect(response.body.message).toBe("Invalid email or password");
    });
  });
});
