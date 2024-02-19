import express, { Request, Response } from 'express';
import { updateUser } from '../services/update.service'; // Importe a função do service

const router = express.Router();

// Rota para atualizar as informações do usuário
router.post('/update', async (req: Request, res: Response) => {
  try {
    const { oldEmail, newName, newEmail, newPassword, newUserName } = req.body; // Extrair dados do corpo da requisição

    // Verificar se todos os campos necessários foram fornecidos
    if (!oldEmail || !newName || !newEmail || !newPassword || !newUserName) {
      return res.status(400).json({ message: 'Por favor, forneça todos os dados necessários' });
    }

    // Chame a função do service para atualizar as informações do usuário
    const updatedUser = await updateUser(oldEmail, newName, newEmail, newPassword, newUserName);
    
    // Verificar se o usuário foi encontrado e atualizado com sucesso
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.status(200).json({ message: 'Dados atualizados com sucesso', updatedUser }); // Retorne uma resposta com a mensagem e o usuário atualizado
  } catch (error) {
    console.error('Erro ao atualizar as informações do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' }); // Retorne uma resposta de erro
  }
});

export default router;
