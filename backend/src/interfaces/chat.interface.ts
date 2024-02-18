export interface IMessage {
    content: string;
    sender: string;
}
  
export interface IChat {
    participants: string[]; 
    messages: IMessage[];
}