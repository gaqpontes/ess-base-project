import { Schema } from "mongoose";
import { IChat, IMessage } from "../interfaces/chat.interface";

const messageSchema: Schema = new Schema<IMessage>({
  content: {type: String, required: true},
  sender: { type: String, required: true },
});

const chatSchema: Schema = new Schema<IChat>({
  participants: [{type: String, required: true}],
  messages: [messageSchema],
});

export { messageSchema, chatSchema };
