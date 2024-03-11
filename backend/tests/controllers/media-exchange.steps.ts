import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import MessagesDatabase from '../../src/database/message.database';
import { IMessage } from '../../src/interfaces/chat.interface';

const feature = loadFeature('tests/features/media-exchange.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let response: supertest.Response;
  let messagesDatabase: MessagesDatabase;
  let timestampValue: Date;

  beforeEach(() => {
    messagesDatabase = MessagesDatabase.getInstance();
    messagesDatabase.reset();
  });

  test('Obtendo histórico de envio de mídias', ({ given, when, then, and }) => {
    given(/^o método getMediaConversation retorna uma lista de mídias$/, () => {

    });

    and(/^a mídia com id "(.*)", sender "(.*)" e receiver "(.*)" está na lista$/, (id, sender, receiver) => {
      timestampValue = new Date(Date.now());
      messagesDatabase.addMessage({
        id: id,
        content: '',
        sender: sender,
        receiver: receiver,
        media: true,
        timestamp: timestampValue
      });
    });

    when(/^uma requisão GET for enviada para "(.*)"$/, async (arg0) => {
      response = await request.get(arg0);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter uma lista de mídias$/, () => {

    });

    and(/^a mídia com id "(.*)", sender "(.*)" e receiver "(.*)" deve estar na lista$/, (arg0, arg1, arg2) => {
      expect(response.body.data).toContainEqual({
        id: arg0,
        content: '',
        sender: arg1,
        receiver: arg2,
        media: true,
        timestamp: timestampValue.toISOString()
      });
    });
  });

  test('Remoção de mídia inexistente', ({ given, when, then, and }) => {
    given(/^o método getMessage retorna "(.*)"$/, (returnValue) => {
      jest.spyOn(messagesDatabase, 'getMessage').mockReturnValueOnce(returnValue);
    });

    when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
      response = await request.delete(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (message) => {
      expect(response.body.msg).toBe(message);
    });
  });

  test('Remoção de mídia enviada por outro usuário', ({ given, when, then, and }) => {
    given(/^o método getMessage retorna uma mídia com id "(.*)", sender "(.*)" e receiver "(.*)"$/, (id, sender, receiver) => {
      jest.spyOn(messagesDatabase, 'getMessage').mockReturnValueOnce({
        id: id,
        content: '',
        sender: sender,
        receiver: receiver,
        media: true,
        timestamp: new Date(Date.now())
      } as IMessage);
    });

    when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
      response = await request.delete(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (message) => {
      expect(response.body.msg).toBe(message);
    });
  });

  test('Envio de mídia que excede o tamanho máximo permitido', ({ given, when, then, and }) => {
    given(/^o arquivo "(.*)" possui o tamanho de "(.*)"$/, (file, size) => {

    });

    when(/^uma requisição POST for enviada para "(.*)"$/, async (url) => {
      response = await request.post(url);
    });

    then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (message) => {
      expect(response.body.msg).toBe(message);
    });
  });

});
