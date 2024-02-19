Feature: Recovery

Scenario: Create a recovery token
  Given que um usuário esqueceu sua senha
  When o usuário envia uma requisição POST para "/api/recovery/createtoken" com o corpo contendo um email válido
  Then o sistema deve processar a solicitação e retornar o status "200"
  And o JSON da resposta deve conter uma mensagem de sucesso

Scenario: Attempt to create a recovery token with invalid email
  Given que um usuário esqueceu sua senha
  When o usuário envia uma requisição POST para "/api/recovery/createtoken" com o corpo contendo um email inválido
  Then o sistema deve retornar o status "200" indicando que se o e-mail for encontrado será enviado um token

Scenario: Change password with valid token
  Given que um usuário possui um token válido para recuperação de senha
  When o usuário envia uma requisição POST para "/api/recovery/chgpwd" com o corpo contendo um email, um token e uma nova senha
  Then o sistema deve processar a solicitação e retornar o status "200" indicando que a senha foi alterada com sucesso
  And o JSON da resposta deve conter uma mensagem de sucesso

Scenario: Attempt to change password with invalid token
  Given que um usuário possui um token inválido para recuperação de senha
  When o usuário envia uma requisição POST para "/api/recovery/chgpwd" com o corpo contendo um email, um token inválido e uma nova senha
  Then o sistema deve retornar o status "400" indicando que o token é inválido
  And o JSON da resposta deve conter uma mensagem de erro