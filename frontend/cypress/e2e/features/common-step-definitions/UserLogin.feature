Feature: Login API
 As a usuário
 I want logar na minha conta.

    Scenario: Login bem-sucedido
        Given o usuário está na página "login"
        When o usuário preenche os campos "input-email" com "Joao2@gmail.com" e "input-password" com "senha123" e clica no botão "login-button"
        Then o usuário deve ver a mensagem "Login successful"

    Scenario: Falha no login devido a credenciais não existentes no banco
        Given o usuário está na página "login"
        When o usuário preenche os campos "input-email" com "Joaosilva@gmail.com" e "input-password" com "senha123" e clica no botão "login-button"
        Then o usuário deve ver a mensagem "Invalid email or password"