export interface IMessage {
    content: string;
    sender: string;
    receiver: string;
    id: string;
    media: boolean;
    timestamp: Date;
}
  
export interface IChat {
    id: string;
    participants: string[]; 
    fixed: boolean;
    messages: IMessage[];
}