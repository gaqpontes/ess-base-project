Feature: Login API
 As a usuário
 I want deletar minha conta.

    Scenario: User delete bem-sucedido
        Given o usuário está na página "delete"
        When o usuário preenche os campos "confirm-email-input" com "JoaoOliveira@gmail.com" e "confirm-password-input" com "joao3221" e clica no botão "delete-button"
        Then o usuário deve ver a mensagem "Dados do usuário excluídos com sucesso"

    Scenario: Falha ao deletar usuário devido a credenciais não existentes no banco
        Given o usuário está na página "delete"
        When o usuário preenche os campos "confirm-email-input" com "Joao@gmail.com" e "confirm-password-input" com "senha123" e clica no botão "delete-button"
        Then o usuário deve ver a mensagem "Erro ao excluir os dados do usuário"