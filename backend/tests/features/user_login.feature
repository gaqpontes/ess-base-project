Feature: Login API

    Scenario: Login bem-sucedido
        Given um usuário existente no banco de dados com email "Joao2@gmail.com" e senha "senha123"
        When uma requisição POST é enviada para "/api/users/login" com email "Joao2@gmail.com" e senha "senha123"
        Then o status da resposta deve ser "200"
        And a resposta JSON deve conter "Login successful" 

    Scenario: Falha no login devido a credenciais não existentes no banco
        Given um usuário com email "usuario@teste.com" e senha "senha123" não está cadastrado no banco
        When uma requisição POST é enviada para "/api/users/login" com email "usuario@teste.com" e senha "senha123"
        Then o status da resposta deve ser "401"
        And a resposta deve conter o detalhe "Invalid email or password"