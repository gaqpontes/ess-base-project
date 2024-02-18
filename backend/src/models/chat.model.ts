import { model } from "mongoose";
import { messageSchema, chatSchema } from "../schema/chat.schema";

const messageModel = model('Message', messageSchema);
const chatModel = model('Chat', chatSchema);

export { messageModel, chatModel };
