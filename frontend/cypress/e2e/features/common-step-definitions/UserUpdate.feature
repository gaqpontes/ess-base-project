Feature: Login API
 As a usuário
 I want atualizar meus dados.

    Scenario: Update bem sucedido
        Given o usuário está na página "update"
        When o usuário preenche os campos "input-oldEmail" com "Joao2@gmail.com", "input-newName" com "joao silva", "input-newEmail" com "JoaoSilva@gmail.com", "input-newUserName" com "joao321" e "input-newPassword" com "senha123" e clica no botão "update-button"
        Then o usuário deve ver a mensagem "Informações do usuário atualizadas com sucesso"

    Scenario: Falha Update devido a credenciais não existentes no banco
        Given o usuário está na página "update"
        When o usuário preenche os campos "input-oldEmail" com "JoaoOliveira123@gmail.com", "input-newName" com "joao silva", "input-newEmail" com "JoaoSilva@gmail.com", "input-newUserName" com "joao321" e "input-newPassword" com "senha123" e clica no botão "update-button"
        Then o usuário deve ver a mensagem "Erro ao atualizar as informações do usuário"