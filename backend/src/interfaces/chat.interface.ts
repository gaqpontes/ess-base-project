export interface IMessage {
    content: string;
    sender: string;
    receiver: string;
    id: string;
}
  
export interface IChat extends Document{
    participants: string[]; 
    messages: IMessage[];
}