Feature: Create Usuario
  As a usuário
  I want criar um usuário novo.

Scenario: Criar um novo usuário com sucesso
    Given o usuário está na página "register"
    When o usuário preenche os campos "input-name" com "joao silva", "input-email" com "Joao2@gmail.com", "input-username" com "joao123" e "input-password" com "senha123" e clica no botão "submit-button"
    Then o usuário deve ver a mensagem "User registered successfully"

Scenario: Tentar criar um usuário com um email que já está registrado
    Given o usuário está na página "register"
    When o usuário preenche os campos "input-name" com "joao silva", "input-email" com "Joao2@gmail.com", "input-username" com "joao123" e "input-password" com "senha123" e clica no botão "submit-button"
    Then o usuário deve ver a mensagem "E-mail already registered"
