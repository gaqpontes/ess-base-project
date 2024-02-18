import { Router, Request, Response } from 'express';
import { SuccessResult, FailureResult } from '../utils/result';

class RecoveryController {
  private prefix: string = '/recovery';
  public router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    // Rota POST para recuperação de senha
    this.router.post(`${this.prefix}`, async (req: Request, res: Response) => {
      try {
        // Verificar se o email está vazio ou não foi passado
        const email = req.body.email;
        if (!email) {
          return new FailureResult({
            msg: 'O campo de e-mail é obrigatório.',
            msgCode: null,
            code: 400
          }).handle(res);
        }

        // Supondo que a recuperação de senha foi bem-sucedida, você pode enviar uma resposta de sucesso
        // Neste ponto, você também pode gerar e enviar um token por e-mail
        // e redirecionar o usuário para a rota de alteração de senha

        return new SuccessResult({
          msg: 'Se existir alguma conta com este e-mail você receberá um link de recuperação.',
          data: null,
        }).handle(res);
      } catch (error) {
        // Em caso de erro, você pode enviar uma resposta de erro
        console.error(error);
        return res.status(500).json({ error: 'Erro na recuperação de senha' });
      }
    });

    // Rota POST para alteração de senha
    this.router.post(`${this.prefix}/change`, async (req: Request, res: Response) => {
      try {
        // Verificar se o token ou o e-mail está vazio ou não foi passado
        const email = req.body.email;
        const token = req.body.token;

        if (!email || !token) {
          return new FailureResult({
            msg: 'O e-mail e token são obrigatórios.',
            msgCode: null,
            code: 400
          }).handle(res);
        }

        // Supondo que a alteração de senha foi bem-sucedida, você pode enviar uma resposta de sucesso
        return new SuccessResult({
          msg: 'Senha alterada com sucesso.',
          data: null,
        }).handle(res);
      } catch (error) {
        // Em caso de erro, você pode enviar uma resposta de erro
        console.error(error);
        return res.status(500).json({ error: 'Erro na alteração de senha' });
      }
    });

    // Rota GET para recuperar e-mail esquecido
    this.router.get(`${this.prefix}/forgotmail`, async (req: Request, res: Response) => {
      try {
        return new SuccessResult({
          msg: 'Entre em contato com os desenvolvedores para receber assistência na sua recuperação de conta',
          data: null,
        }).handle(res);
      } catch (error) {
        // Em caso de erro, você pode enviar uma resposta de erro
        console.error(error);
        return res.status(500).json({ error: 'Erro ao recuperar e-mail esquecido' });
      }
    });
  }
}

export default RecoveryController;
