import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RecoveryTokensDatabase from '../../src/database/recovery.database';
import UserDatabase from '../../src/services/user.register.database';
import { constrainedMemory } from 'process';
import fs from 'fs';

const feature = loadFeature('tests/features/recovery.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockRecoveryTokensDatabase: RecoveryTokensDatabase;
  let mockUserDatabase: UserDatabase;
  let response: supertest.Response;

  beforeEach(() => {
    mockRecoveryTokensDatabase = RecoveryTokensDatabase.getInstance();
    mockUserDatabase = new UserDatabase('./src/database/users.json');
  });
  afterEach(() => {
    // Empty the content of users.json after each test
    fs.writeFileSync('./src/database/users.json', JSON.stringify([]));
  });

  afterAll(() => {
    // Add the specified user data at the end of all tests
    const userData = {
      name: 'João Silva',
      email: 'Joao2@gmail.com',
      username: 'joao123',
      password: '123'
    };

    // Read the current content of users.json
    const existingData = JSON.parse(fs.readFileSync('./src/database/users.json', 'utf8'));

    // Add the new user data
    existingData.push(userData);

    // Write the updated content back to users.json
    fs.writeFileSync('./src/database/users.json', JSON.stringify(existingData, null, 2));
  });
    
  test('Create a recovery token', ({ given, when, then, and }) => {
    given(/^que um usuário esqueceu sua senha$/, () => {
      // Implementação do passo inicial (Given)
    });

    when(
      /^o usuário envia uma requisição POST para "(.*)" com o corpo contendo um email válido$/,
      async (url) => {
        // Implementação do passo quando (When) para o cenário de criar token
        response = await request.post(url).send({
          email: 'usuario@example.com',
        });
      }
    );

    then(/^o sistema deve processar a solicitação e retornar o status "(.*)"$/, (statusCode) => {
      // Implementação do passo então (Then) para verificar o status da resposta
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma mensagem de sucesso$/, () => {
      // Implementação do passo então (Then) para verificar o conteúdo do JSON de resposta
      expect(response.body.msg).toBe('Se existir alguma conta com este e-mail você receberá um link de recuperação.');
    });
  });

  test('Attempt to create a recovery token with invalid email', ({ given, when, then, and }) => {
    given(/^que um usuário esqueceu sua senha$/, () => {
      // Implementação do passo inicial (Given)
    });
    
    when(
      /^o usuário envia uma requisição POST para "(.*)" com o corpo contendo um email inválido$/,
      async (url) => {
        // Chama a API para o endpoint correspondente
        response = await request.post(url).send({
          email: 'emailinvalido',
        });
      }
    );

    then(/^o sistema deve retornar o status "(.*)" indicando que se o e-mail for encontrado será enviado um token$/, (statusCode) => {
      // Implementação do passo então (Then) para verificar o status e a mensagem de erro
      expect(response.status).toBe(parseInt(statusCode, 10));
      expect(response.body.msgCode).toBe('success');
    });
    
  });
  test('Change password with valid token', ({ given, when, then, and }) => {
    given(/^que um usuário possui um token válido para recuperação de senha$/, async () => {
      const validToken = 'token_valido';
      const userEmail = 'ess@example.com';
      // Adiciona o usuário no banco de dados
      mockUserDatabase.createUser('testname',userEmail,'usertest','testpwd');      
      // Adiciona o token de recuperação válido no banco de dados
      mockRecoveryTokensDatabase.addRecoveryToken(userEmail, validToken);
    });
  
    when(
      /^o usuário envia uma requisição POST para "(.*)" com o corpo contendo um email, um token e uma nova senha$/,
      async (url) => {
        // Implemente o passo quando (When) para o cenário de alteração de senha com token válido
        // Chame a API para o endpoint correspondente e verifique o resultado
        response = await request.post(url).send({
          email: 'ess@example.com',
          password: 'novaSenha',
          token: 'token_valido',
        });
      }
    );
      
    then(/^o sistema deve processar a solicitação e retornar o status "(.*)" indicando que a senha foi alterada com sucesso$/, (statusCode) => {
      // Implemente o passo então (Then) para verificar o status da resposta
      expect(response.status).toBe(parseInt(statusCode, 10));
    });
  
    and(/^o JSON da resposta deve conter uma mensagem de sucesso$/, () => {
      // Implemente o passo então (Then) para verificar o conteúdo do JSON de resposta
      expect(response.body.msg).toBe('Senha alterada com sucesso.');
    });
  });
  
  test('Attempt to change password with invalid token', ({ given, when, then, and }) => {
    given(/^que um usuário possui um token inválido para recuperação de senha$/, async () => {
      const invalidToken = 'token_valido';
      const userEmail = 'test@example.com';
      // Adiciona o token de recuperação inválido no banco de dados
      mockRecoveryTokensDatabase.addRecoveryToken(userEmail, invalidToken);
    });
  
    when(
      /^o usuário envia uma requisição POST para "(.*)" com o corpo contendo um email, um token inválido e uma nova senha$/,
      async (url) => {
       // Chama a API para o endpoint correspondente e verifique o resultado
        response = await request.post(url).send({
          email: 'test@example.com',
          password: 'novaSenha',
          token: 'token_invalido',
        });
      }
    );
  
    then(/^o sistema deve retornar o status "(.*)" indicando que o token é inválido$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });
    and(/^o JSON da resposta deve conter uma mensagem de erro$/, () => {
      expect(response.body.msg).toBe('Token inválido');
    });    
  });
});