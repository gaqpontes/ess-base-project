Feature: Lista de contatos
    As um "Pedro"
    I want acessar e gerenciar lista de contatos
    So that posso manter e gerenciar uma lista atualizada

Scenario: Adição de um Novo Contato na Lista (confirmado)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria" e "João"
    And "Pedro" vê a opção "adicionar contato"
    When "Pedro" seleciona a opção "adicionar contato"
    Then "Pedro" está na tela de "inserção de informações do contato"
    When "Pedro" preenche manualmente os campos "Letícia", "12345678"
    And "Pedro" vê a opção "confirmar" e "cancelar"
    When "Pedro" seleciona "confirmar"
    Then "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria", "João" e "Letícia"

Scenario: Adição de um Novo Contato na Lista (cancelado)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria" e "João"
    And "Pedro" vê a opção "adicionar contato"
    When "Pedro" seleciona a opção "adicionar contato"
    Then "Pedro" está na tela de "inserção de informações do contato"
    When "Pedro" preenche manualmente os campos "Letícia", "12345678", "vegetariana"
    And "Pedro" vê a opção "confirmar" e "cancelar"
    When "Pedro" seleciona "cancelar"
    Then "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria" e "João"

Scenario: Adição de um Novo Contato na Lista (erro)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria" e "João"
    And "Pedro" vê a opção "adicionar contato"
    When "Pedro" seleciona a opção "adicionar contato"
    Then "Pedro" está na tela de "inserção de informações do contato"
    When "Pedro" preenche manualmente os campos "Letícia", "12345678", "vegetariana"
    And "Pedro" vê a opção "confirmar" e "cancelar"
    When "Pedro" seleciona "confirmar"
    Then "Pedro" recebe uma mensagem "Erro! Usuário não cadastro no sistema"
    And "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria" e "João"

Scenario: informações do Contato (iniciar conversa)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria" e "João"
    When "Pedro" clica no contato "Maria"
    Then "Pedro" é redirecionado para a tela "informações do contato" de "Maria"
    And "Pedro" pode visualizar detalhes como nome, foto, número, informações adicionais, a opção "iniciar conversa" e a opção "remover contato"
    When "Pedro" clica em  "iniciar conversa"
    Then a tela de conversa é aberta

Scenario: informações do Contato (remover contato)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria", "João" e "Letícia"
    When "Pedro" clica no contato "Maria"
    Then "Pedro" é redirecionado para a tela "informações do contato" de "Maria"
    And "Pedro" pode visualizar detalhes como nome, foto, número, informações adicionais, a opção "iniciar conversa" e a opção "remover contato"
    When "Pedro" clica em  "remover contato"
    Then a mensagem de confirmação com as opções "Confirmar" e "Cancelar" é exibida
    When "Pedro" seleciona "Confirmar"
    Then "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Letícia" e "João"

Scenario: informações do Contato (remover contato)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria", "João" e "Letícia"
    When "Pedro" clica no contato "Maria"
    Then "Pedro" é redirecionado para a tela "informações do contato" de "Maria"
    And "Pedro" pode visualizar detalhes como nome, foto, número, informações adicionais, a opção "iniciar conversa" e a opção "remover contato"
    When "Pedro" clica em  "remover contato"
    Then a mensagem de confirmação com as opções "Confirmar" e "Cancelar" é exibida
    When "Pedro" seleciona "Cancelar"
    Then "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria", "João" e "Letícia"


Scenario: Busca por Contato (bem-sucedida)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria", "João" e "Letícia"
    And "Pedro" vê a opção "buscar"
    When "Pedro" digita "Letícia"
    Then "Pedro" vê o contato "Letícia", destacado como desejado
    And os demais contatos na lista são filtrados de acordo com os critérios da pesquisa

Scenario: Busca por Contato (malsucedida)
    Given o usuário "Pedro" está na página de "Lista de Contatos"
    And "Pedro" vê os contatos "Maria", "João" e "Letícia"
    And "Pedro" vê a opção "buscar"
    When "Pedro" digita "Paulo"
    Then "Pedro" vê uma mensagem "erro! Usuário não encontrado"
    And os demais contatos na lista são filtrados de acordo com os critérios da pesquisa
