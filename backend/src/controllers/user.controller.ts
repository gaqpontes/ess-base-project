import UserModel from '../models/user.model';
import { Request, Response } from 'express';
import UserDatabase from '../services/user.register.database';

// Caminho para o arquivo JSON de usuários
const usersFilePath = './src/database/users.json';
// Crie uma instância do UserDatabase
const userDatabase = new UserDatabase(usersFilePath);

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, username, password } = req.body;

    // Verificar se o usuário já existe
    const existingUser = userDatabase.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'E-mail already registered' });
      return;
    }

    // Criar um novo usuário
    const newUser = await userDatabase.createUser(name, email,username, password);

    // Responder ao cliente com uma mensagem de sucesso
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
