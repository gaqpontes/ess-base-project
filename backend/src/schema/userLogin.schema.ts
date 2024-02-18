import { Schema, Document } from 'mongoose';
import { UserLogin } from "../interfaces/user.login.interface";

// Definindo o schema do usuário
const userSchema: Schema = new Schema <UserLogin>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
  });

export {userSchema};