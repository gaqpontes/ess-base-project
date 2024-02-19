import { Request, Response } from 'express';
import { updateUser } from '../services/update.service'; // Importe a função do serviço

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extraia os dados do corpo da requisição
    const {OldEmail, newName, newEmail, newPassword, newUserName} = req.body;

    // Chame a função do serviço para atualizar as informações do usuário
    const updatedUser = await updateUser(OldEmail,newName,newEmail,newPassword,newUserName);

    // Retorne uma resposta de sucesso com o usuário atualizado
    res.status(200).json({ message: 'Informações do usuário atualizadas com sucesso', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar as informações do usuário:', error);
    // Retorne uma resposta de erro caso ocorra algum problema durante a atualização
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar as informações do usuário' });
  }
};
