import { Schema, Document } from 'mongoose';
import { IUser } from "../interfaces/user.interface";

// Definindo o schema do usuário
const userSchema: Schema = new Schema <IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name:{type:String,required:true}
    
  });

export {userSchema};
