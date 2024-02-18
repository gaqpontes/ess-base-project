import { Request, Response } from 'express';
import { UserLogin } from '../interfaces/user.login.interface';
import { authenticateUser } from '../services/login.service';

// Função para lidar com o login de usuários
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extrair o email e a senha do corpo da requisição
    const { email, password } = req.body;

    // Verificar se o email e a senha foram fornecidos
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Chamar o serviço de autenticação para fazer login
    const user: UserLogin | null = await authenticateUser(email, password);

    // Verificar se o usuário foi encontrado e as credenciais estão corretas
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Se o usuário for encontrado e as credenciais estiverem corretas, retornar uma resposta de sucesso
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
