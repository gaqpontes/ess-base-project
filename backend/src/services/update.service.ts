import fs from 'fs';
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

// Função para atualizar os dados do usuário
export const updateUser = async (OldEmail: string, newName: string, newEmail: string, newPassword: string, newUserName: string): Promise<IUser | null> => {
  try {
    // Carrega os usuários do arquivo JSON
    const users = loadUsersFromFile();

    // Encontra o usuário pelo email
    const userIndex = users.findIndex(user => user.email === OldEmail);

    // Se o usuário não for encontrado, retorna null
    if (userIndex === -1) {
      return null;
    }

    // Atualiza os dados do usuário
    users[userIndex].name = newName;
    users[userIndex].email = newEmail;
    users[userIndex].password = newPassword;
    users[userIndex].username = newUserName;

    // Salva os usuários atualizados no arquivo JSON
    saveUsersToFile(users);

    // Retorna o usuário atualizado
    return users[userIndex];
  } catch (error) {
    console.error('Erro ao atualizar os dados do usuário:', error);
    throw new Error('Erro interno ao atualizar os dados do usuário');
  }
};
