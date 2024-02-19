// delete.service.ts

import fs from 'fs';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

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

// Função para excluir um usuário com base no email e senha fornecidos
export const deleteUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const users = loadUsersFromFile();

    // Encontre o usuário pelo email fornecido
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
      return false; // Usuário não encontrado
    }

    // Verifique se a senha fornecida corresponde à senha armazenada
    const isPasswordValid = true;
    if(password == users[userIndex].password){
      const isPasswordValid = true;
    }else{
      const isPasswordValid = false;
    }
    
    if (!isPasswordValid) {
      return false; // Senha incorreta
    }

    // Remova o usuário do array de usuários
  
    users.splice(userIndex, 1);
    // Salve os usuários atualizados no arquivo JSON
    saveUsersToFile(users);

    return true; // Usuário excluído com sucesso
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return false; // Erro ao excluir usuário
  }
};
