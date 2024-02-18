import { model } from "mongoose";
import { userSchema } from "../schema/userLogin.schema";

// Criando o modelo de usuário com base no schema
const UserLogin = model('UserLogin', userSchema);

export default UserLogin;
