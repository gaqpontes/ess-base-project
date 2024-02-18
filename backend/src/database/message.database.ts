import { IMessage } from '../interfaces/chat.interface';

export default class MessagesDatabase {
    private static instance: MessagesDatabase;
    private messages: IMessage[];

    private constructor() {
        this.messages = [];
    }

    static getInstance() {
        if (!MessagesDatabase.instance) {
            MessagesDatabase.instance = new MessagesDatabase();
        }
        return MessagesDatabase.instance;
    }

    addMessage(message: IMessage) {
        this.messages.push(message);
    }

    getMessagesByParticipant(participant: string) {
        return this.messages.filter(message => message.sender === participant);
    }

    getMessagesBetweenParticipants(participant1: string, participant2: string) {
        return this.messages.filter(message =>
            message.sender === participant1 || message.sender === participant2
        );
    }

}
