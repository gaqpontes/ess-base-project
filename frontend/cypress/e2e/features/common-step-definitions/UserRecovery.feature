Feature: Recovery API
 As a usuário
 I want recuperar a minha conta.

    Scenario: Create a recovery token
        Given o usuário está na página "recovery"
        When o usuário preenche os campos "input-email" com "Joao2@gmail.com" e clica no botão "recover-button"
        Then o usuário deve ver a mensagem "Se existir alguma conta com este e-mail você receberá um link de recuperação."

    Scenario: Change password with invalid token
        Given o usuário está na página "changepass"
        When o usuário preenche os campos "input-token" com "1234" e "input-email" com "Joao2@gmail.com" e "input-password" com "123" e "input-confirm-password" com "123" e clica no botão "recover-button"
        Then o usuário deve ver a mensagem de erro "Token inválido"

    Scenario: Change password with valid token
        Given o usuário está na página "changepass"
        When o usuário preenche os campos "input-token" com "123" e "input-email" com "Joao2@gmail.com" e "input-password" com "123" e "input-confirm-password" com "123" e clica no botão "recover-button"
        Then o usuário deve ver a mensagem de sucesso "Senha alterada com sucesso."