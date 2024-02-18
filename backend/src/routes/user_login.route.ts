import express, { Request, Response } from 'express';
import { authenticateUser } from '../services/login.service';

const router = express.Router();

// Rota para o login de usuário
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Autentica o usuário
    const user = await authenticateUser(email, password);

    // Verifica se a autenticação foi bem-sucedida
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Se a autenticação for bem-sucedida, você pode enviar uma resposta com os dados do usuário ou um token de autenticação
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
