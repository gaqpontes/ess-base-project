import crypto from 'crypto';
import RecoveryTokensDatabase from '../database/recovery.database';
import { UserRecovery } from '../interfaces/user.recovery.interface';
//import { loadUsersFromFile } from './login.service';
import UserDatabase from './user.register.database';
import fs from 'fs';
import { IUser } from '../interfaces/user.interface';

const recoveryTokensDatabase = RecoveryTokensDatabase.getInstance();
const usersFilePath = './src/database/users.json';

// Função para carregar os usuários do arquivo JSON
const loadUsersFromFile = (): IUser[] => {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao carregar usuários do arquivo:', error);
      return [];
    }
  };

// Função para salvar os usuários no arquivo JSON
const saveUsersToFile = (users: IUser[]): void => {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Erro ao salvar usuários no arquivo:', error);
    }
};

export const sendMail = async (email: string, recoveryToken: string): Promise<void> => {
    try {

        // Lógicas adicionais (registrar o envio em log, verificações, preparar o email, etc)
        // ...
        // Fim das lógicas adicionais

        // Envio do e-mail 
        console.log(`Email enviado para ${email} com o token de recuperação: ${recoveryToken}`);

    } catch (error) {
      console.error('Erro ao enviar o e-mail de recuperação:', error);
      throw new Error('Erro interno ao simular o envio de e-mail de recuperação');
    }
};

export const tokenCreate = async (email: string): Promise<UserRecovery | null> => {
  try {
        // Busca o usuário com o email fornecido no RecoveryTokensDatabase
        const recoveryTokenEntry = recoveryTokensDatabase.getRecoveryTokenByEmail(email);
        // Carrega os usuários do arquivo JSON (substitua isso pelo seu método real de carregamento)
        const users = loadUsersFromFile();
        // Busca o usuário com o email fornecido no array de usuários
        const user = users.find((user) => user.email === email);

        // Se o token já existir, retorna o usuário associado a esse token e reenvia o email
        if (recoveryTokenEntry && user) { 
        // Envia o email com o token
        await sendMail(email,recoveryTokenEntry.token);     
        return user;
        }

        if (user) {
        // Gere um novo token aleatório
        // const recoveryToken = crypto.randomBytes(32).toString('hex');  // Substitua isso pela implementação real
        const recoveryToken = "123";

        // Adicione o novo token ao RecoveryTokensDatabase
        recoveryTokensDatabase.addRecoveryToken(email, recoveryToken);

        // Envia o email com o token
        await sendMail(email,recoveryToken);

        // Retorna o usuário associado a esse token
        return user;
    }

    // Retorna null se o usuário não for encontrado
    return null;
  } catch (error) {
    console.error('Erro ao criar token de recuperação:', error);
    throw new Error('Erro interno ao criar token de recuperação');
  }
};

export const recoverPassword = async (email: string, password: string, token: string): Promise<string | null> => {
    try {
        const recoveryTokenEntry = recoveryTokensDatabase.getRecoveryTokenByEmail(email);

        // Verifica se o token fornecido corresponde ao token armazenado no RecoveryTokensDatabase
        if (!recoveryTokenEntry || recoveryTokenEntry.token !== token) {
            return "Token inválido";
        }

        // Carrega os usuários do arquivo JSON (substitua isso pelo seu método real de carregamento)
        const users = loadUsersFromFile();

        // Encontra o usuário pelo email
        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex === -1) {
            return "Email inválido";
        } else {
            // Atualiza a senha do usuário com a nova senha fornecida
            users[userIndex].password = password;

            // Remove o token de recuperação após o uso
            recoveryTokensDatabase.deleteRecoveryTokenByEmail(email);
            // Salva os usuários atualizados no arquivo JSON
            saveUsersToFile(users);
        }
        return null;
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      throw new Error('Erro interno ao recuperar senha');
    }
  };