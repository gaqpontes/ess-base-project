import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import RecoveryTokensDatabase from '../../src/database/recovery.database';  // Certifique-se de importar a classe correta

const feature = loadFeature('tests/features/recovery.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockRecoveryTokensDatabase: RecoveryTokensDatabase;
  let response: supertest.Response;

  beforeEach(() => {
    mockRecoveryTokensDatabase = RecoveryTokensDatabase.getInstance();
  });

  test('Create a token for recovery', ({ given, when, then }) => {
    given(/^o RecoveryTokensDatabase não tem um token de recuperação para o e-mail "(.*)"$/, (email) => {
      // Limpa qualquer token existente para o e-mail fornecido antes de iniciar o teste
      mockRecoveryTokensDatabase.deleteRecoveryTokenByEmail(email);
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o e-mail "(.*)"$/,
      async (url, email) => {
        response = await request.post(url).send({
          email: email,
        });
      }
    );

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });
  });
});
