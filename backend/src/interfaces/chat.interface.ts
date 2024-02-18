export interface IMessage {
    content: string;
    sender: string;
}
  
export interface IChat extends Document{
    participants: string[]; 
    messages: IMessage[];
}