import { Router, Request, Response } from 'express';
import { SuccessResult, FailureResult } from '../utils/result';
import { tokenCreate, recoverPassword } from '../services/recovery.service';  // Importe o serviço de recuperação

class RecoveryController {
  private prefix: string = '/recovery';
  public router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    // Rota POST para recuperação de senha
    this.router.post(`${this.prefix}/createtoken`, async (req: Request, res: Response) => {
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

        // Chamar o serviço para criar um token de recuperação
        const user = await tokenCreate(email);

        return new SuccessResult({
          msg: 'Se existir alguma conta com este e-mail você receberá um link de recuperação.',
          code: 200,
          data: null
        }).handle(res);
      } catch (error) {
        // Em caso de erro, você pode enviar uma resposta de erro
        console.error(error);
        return new FailureResult({
          msg: 'Erro na recuperação de senha',
          msgCode: null,
          code: 500
        }).handle(res);
      }
    });

    // Rota POST para alteração de senha
    this.router.post(`${this.prefix}/chgpwd`, async (req: Request, res: Response) => {
      try {
        // Verificar se o token, o e-mail ou a nova senha está vazio ou não foi passado
        const email = req.body.email;
        const token = req.body.token;
        const password = req.body.password;

        if (!email || !token || !password) {
          return new FailureResult({
            msg: 'Preencha todos os campos obrigatórios.',
            msgCode: null,
            code: 400
          }).handle(res);
        }

        const response = await recoverPassword(email, password, token);

        if (!response){
          // Supondo que a alteração de senha foi bem-sucedida, você pode enviar uma resposta de sucesso
          return new SuccessResult({
            msg: 'Senha alterada com sucesso.',
            code: 200,
            data: null,
          }).handle(res);
        } else {
          return new FailureResult({
            msg: response,
            msgCode: null,
            code: 400
          }).handle(res);
        }

      } catch (error) {
        // Em caso de erro, você pode enviar uma resposta de erro
        console.error(error);
        return new FailureResult({
          msg: 'Erro na recuperação de senha',
          msgCode: null,
          code: 500
        }).handle(res);
      }
    });

    // Rota GET para recuperar e-mail esquecido
    this.router.get(`${this.prefix}/forgotmail`, async (req: Request, res: Response) => {
      try {
        return new SuccessResult({
          msg: 'Entre em contato com os desenvolvedores para receber assistência na sua recuperação de conta',
          code: 200,
          data: null,
        }).handle(res);
      } catch (error) {
        return new FailureResult({
          msg: 'Erro ao recuperar e-mail esquecido',
          msgCode: null,
          code: 500
        }).handle(res);
      }
    });
  }
}

export default RecoveryController;
