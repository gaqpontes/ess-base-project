import { model } from "mongoose";
import { userSchema } from "../schema/user.schema";

// Criando o modelo de usuário com base no schema
const UserModel = model('User', userSchema);

export default UserModel;
