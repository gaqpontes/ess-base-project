import { Request, Response } from 'express';
import { deleteUser } from '../services/delete.service'; // Importe a função do service

// Controller para exclusão dos dados do usuário
export const deleteUserData = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; // Extrair email e senha do corpo da requisição

    // Verificar se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça o email e a senha do usuário' });
    }

    // Chame a função do service para excluir os dados do usuário
    const deletedUser = await deleteUser(email, password);

    // Verificar se o usuário foi encontrado e excluído com sucesso
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado ou senha incorreta' });
    }

    res.status(200).json({ message: 'Dados do usuário excluídos com sucesso' }); // Retorne uma resposta com a mensagem de sucesso
  } catch (error) {
    console.error('Erro ao excluir os dados do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' }); // Retorne uma resposta de erro
  }
};
