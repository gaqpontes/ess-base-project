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
    // Como a classe UserDatabase espera um caminho de arquivo, podemos
    // passar um caminho fictício apenas para satisfazer a assinatura do construtor
    userDatabase = new UserDatabase('users.json');
    // Certifique-se de que o método reset existe na classe UserDatabase
    userDatabase.clear();
  });

  test('Criar um novo usuário com sucesso', ({ given, when, then, and }) => {
    given(/^não existe um usuário com email "(.*)" no banco de dados$/, async (email) => {
      // Verifica se não existe nenhum usuário com o email fornecido no banco de dados
      const existingUser = userDatabase.findByEmail(email);
      expect(existingUser).toBeUndefined(); // Espera-se que não haja usuário com o email fornecido
    });

    when(/^uma requisição "(.*)" for enviada para "(.*)" com nome "(.*)", email "(.*)", username "(.*)" e senha "(.*)"$/, async (method, url, name, email, username, password) => {
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

    and(/^o JSON da resposta deve conter o nome "(.*)", email "(.*)", username "(.*)", senha "(.*)" e uma mensagem de sucesso "(.*)"$/, (name, email, username, password, successMessage) => {
      expect(response.body.name).toBe(name);
      expect(response.body.email).toBe(email);
      expect(response.body.username).toBe(username);
      expect(response.body.password).toBe(password);
      expect(response.body.message).toBe(successMessage);
    });
  });

  test('Tentar criar um usuário com um email que já está registrado', ({ given, when, then, and }) => {
    given(/^existe um usuário com email "(.*)" no banco de dados$/, async (email) => {
      // Aqui você pode adicionar lógica para simular que o usuário já existe
      // Verifique se o método findByEmail ou algum método semelhante está disponível na classe UserDatabase
    });

    when(/^uma requisição "(.*)" for enviada para "(.*)" com email "(.*)"$/, async (method, url, email) => {
      response = await request.post(url).send({
        email: email
      });
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^a resposta deve conter o detalhe "(.*)"$/, (detail) => {
      expect(response.body.detail).toBe(detail);
    });
  });
});
