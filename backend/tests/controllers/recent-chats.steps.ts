import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { IMessage, IChat } from '../../src/interfaces/chat.interface';
import * as chatsService from '../../src/services/chats.service';

const feature = loadFeature('tests/features/recent-chats.feature');
const request = supertest(app);

defineFeature(feature, test => {
    let response: supertest.Response;
    let timestampValue: Date;

    beforeEach(() => {
        chatsService.resetChats();
    });

    test('obtenção todos os chats recentes', ({ given, when, then, and }) => {
        given(/^o método getChats retorna uma lista de conversas$/, () => {});

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
            
            chatsService.addChat(newChat);
        });

        when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
            response = await request.get(url);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });

        and(/^o JSON da resposta deve ser uma lista de conversas$/, () => {});

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" deve estar na lista$/, (id, participant1, participant2) => {
            expect(response.body).toContainEqual({
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [{
                    content: '',
                    sender: participant1,
                    receiver: participant2,
                    id: '1',
                    media: false,
                    timestamp: timestampValue.toISOString()
                }]
              });
        });
    });

    test('remoção bem-sucedida de uma conversa', ({ given, when, then, and }) => {
        given(/^o método deleteChat retorna uma lista de conversas$/, () => {});
    
        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
            
            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
            
            chatsService.addChat(newChat);
        });
    
        when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
            response = await request.delete(url);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
    
        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (msg) => {
            expect(response.body.message).toContain(msg);
        });
    });

    test('remoção malsucedida de uma conversa', ({ given, when, then, and }) => {
        given(/^o método deleteChat retorna uma lista de conversas$/, () => {});
    
        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
            
            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
            
            chatsService.addChat(newChat);
        });
    
        when(/^uma requisição DELETE for enviada para "(.*)"$/, async (url) => {
            response = await request.delete(url);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
    
        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (msg) => {
            expect(response.body.message).toContain(msg);
        });
    });

    test('fixação bem-sucedida de uma conversa', ({ given, when, then, and }) => {
        given(/^o método fixChat retorna uma conversa$/, () => {});

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        when(/^uma requisição PUT for enviada para "(.*)"$/, async (url) => {
            response = await request.put(url);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });

        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (msg) => {
            expect(response.body.message).toContain(msg);
        });
    });

    test('desafixação bem-sucedida de uma conversa', ({ given, when, then, and }) => {
        given(/^o método unfixChat retorna uma conversa$/, () => {});

        and(/^a conversa com id "(.*)", participantes "(.*)" e "(.*)" e fixed = "(.*)" está na lista$/, (id, participant1, participant2, fixed) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: fixed,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)", participantes "(.*)" e "(.*)" e fixed = "(.*)" está na lista$/, (id, participant1, participant2, fixed) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: fixed,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        when(/^uma requisição PUT for enviada para "(.*)"$/, async (url) => {
            response = await request.put(url);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });

        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (msg) => {
            expect(response.body.message).toContain(msg);
        });
    });

    test('busca malsucedida (nenhum resultado)', ({ given, when, then, and }) => {
        given(/^o método searchChats retorna uma lista de conversas$/, () => {});

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };

            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };

            chatsService.addChat(newChat);
        });

        when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
            response = await request.get(url);
        });

        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
    
        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, (msg) => {
            expect(response.body.message).toContain(msg);
        });
    });

    test('busca bem-sucedida', ({ given, when, then, and }) => {
        given(/^o método searchChats retorna uma lista de conversas$/, () => {});
    
        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };
    
            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
    
            chatsService.addChat(newChat);
        });
        
        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };
    
            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
    
            chatsService.addChat(newChat);
        });

        and(/^a conversa com id "(.*)" e participantes "(.*)" e "(.*)" está na lista$/, (id, participant1, participant2) => {
            timestampValue = new Date(Date.now());
            const newMessage: IMessage = {
                content: '',
                sender: participant1,
                receiver: participant2,
                id: '1',
                media: false,
                timestamp: timestampValue
            };
    
            const newChat: IChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [newMessage]
            };
    
            chatsService.addChat(newChat);
        });
    
        when(/^uma requisição GET for enviada para "(.*)"$/, async (url) => {
            response = await request.get(url);
        });
    
        then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
    
        and(/^o JSON da resposta deve conter a conversa com id "(.*)" e participantes "(.*)" e "(.*)"$/, (id, participant1, participant2) => {
            const expectedChat = {
                id: id,
                participants: [participant1, participant2],
                fixed: false,
                messages: [{
                    content: '',
                    sender: participant1,
                    receiver: participant2,
                    id: '1',
                    media: false,
                    timestamp: expect.any(String)
                }]
            };
            expect(response.body).toContainEqual(expectedChat);
        });
    });
    
    afterAll(() => {
        chatsService.resetChats();
    });
});