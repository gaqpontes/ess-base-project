Feature: Recuperação de conta
    As a usuário
    I want recuperar a senha da minha conta para que eu possa efetuar login

Scenario: Inserção de e-mail válido na recuperação da conta
  Given Um usuário esqueceu sua senha e seleciona a opção "Esqueci a senha" na tela de login.
  When O sistema solicita que o usuário insira o e-mail associado à conta.
  And O usuário insere um e-mail válido e associado à conta.
  Then O sistema processa a solicitação, enviando automaticamente um e-mail com um código de recuperação para o endereço fornecido.
  And O usuário recebe um e-mail com sucesso.

Scenario: Recuperação de conta com código correto
  Given Um usuário recebe um e-mail de recuperação após esquecer a senha.
  When O usuário utiliza corretamente o código recebido e o e-mail para acessar uma tela onde pode criar uma nova senha.
  And O sistema exige que a nova senha seja diferente da anterior.
  Then A senha é atualizada com sucesso e o sistema exibe uma mensagem de confirmação.

Scenario: Inserção de código incorreto na recuperação da conta
  Given Um usuário recebe um e-mail de recuperação após esquecer a senha.
  When O usuário insere incorretamente o código de recuperação ao tentar criar uma nova senha.
  Then O sistema informa o erro ao usuário e solicita que ele tente novamente.

Scenario: Não tenho mais acesso ao e-mail de recuperação de conta
  Given Um usuário não tem mais acesso ao e-mail associado à conta.
  When O usuário seleciona a opção “Não tenho mais acesso ao meu e-mail”.
  Then O sistema exibe uma mensagem orientando o usuário a entrar em contato com os desenvolvedores para receber assistência na recuperação da conta.
