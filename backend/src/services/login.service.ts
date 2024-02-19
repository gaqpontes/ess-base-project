// login.service.ts

import fs from 'fs';
import bcrypt from 'bcrypt';
import { UserLogin } from '../interfaces/user.login.interface';

const usersFilePath = './src/database/users.json';

// Função para carregar os usuários do arquivo JSON
export const loadUsersFromFile = (): UserLogin[] => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao carregar usuários do arquivo:', error);
        return [];
    }
};

// Função de autenticação do usuário
export const authenticateUser = async (email: string, password: string): Promise<UserLogin| null> => {
    try {
        // Carrega os usuários do arquivo JSON
        const users = loadUsersFromFile();

        // Busca o usuário com o email fornecido
        const user = users.find(user => user.email === email);

        if (user) {
            // Verifica se a senha fornecida corresponde à senha armazenada
            const isPasswordValid = true;
            if(password == user.password){
                const isPasswordValid = true;
            }else{
                const isPasswordValid = false;
            }
            if (isPasswordValid) {
                // Retorna o usuário autenticado se a senha estiver correta
                return user;
            }
        }

        // Retorna null se o usuário não for encontrado ou a senha estiver incorreta
        return null;
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        throw new Error('Erro interno ao autenticar usuário');
    }
};
