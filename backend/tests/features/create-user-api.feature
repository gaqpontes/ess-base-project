Feature: Create Usuario API

Scenario: Criar um novo usuário com sucesso
    Given não existe um usuário com nome "joao silva", email "Joao2@gmail.com", username "joao123" e senha "senha123" no banco de dados
    When uma requisição POST for enviada para "/api/users/register" com nome "joao silva", email "Joao2@gmail.com", username "joao123" e senha "senha123"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter o nome "joao silva", email "Joao2@gmail.com", username "joao123" e senha "senha123" e uma mensagem de sucesso "User registered successfully"

Scenario: Tentar criar um usuário com um email que já está registrado
    Given existe um usuário com email "Joao2@gmail.com" no banco de dados
    When uma requisição POST for enviada para "/api/users/register" com email "Joao2@gmail.com"
    Then o status da resposta deve ser "400"
    And a resposta deve conter o detalhe "E-mail already registered"