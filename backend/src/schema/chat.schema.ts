import { Schema } from "mongoose";
import { IChat, IMessage } from "../interfaces/chat.interface";

const messageSchema: Schema = new Schema<IMessage>({
  id: {type: String, required: true, unique: true},
  content: {type: String, required: true},
  sender: { type: String, required: true},
  receiver: { type: String, require: true},
  media: { type: Boolean, required: true},
  timestamp: { type: Date, required: true }
});

const chatSchema: Schema = new Schema<IChat>({
  id: {type: String, required: true, unique: true},
  participants: [{type: String, required: true}],
  fixed: { type: Boolean, default: false },
  messages: [messageSchema]
});

export { messageSchema, chatSchema };
