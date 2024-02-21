Feature: Lista de Conversas Recentes
    As a usuário
    I want ver a lista de conversas recentes ordenada cronologicamente
    So that posso acompanhar as interações mais recentes

Scenario: Fixar uma Conversa no Topo
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy"
    And "Pedro" vê a opção "fixar conversa" em todas as conversas
    When "Pedro" seleciona a opção "fixar conversa" na conversa com "Bia"
    Then "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Bia", "Letícia", "Jessy"

Scenario: Desfixar uma Conversa
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas fixadas listadas nesta ordem: "Bia", "Letícia", "Jessy"
    And "Pedro" vê a opção "desfixar conversa" na conversa com "Bia"
    When "Pedro" seleciona a opção "desfixar conversa" na conversa com "Bia"
    Then "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas fixadas listadas nesta ordem: "Letícia", "Bia", "Jessy"

Scenario: Excluir uma Conversa (Confirmada)
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy"
    And "Pedro" vê a opção "excluir conversa" em todas as conversas
    When "Pedro" seleciona a opção "excluir conversa" na conversa com "Bia"
    Then "Pedro" recebe uma mensagem de confirmação "Deseja excluir sua conversa com 'Bia'"?
    And "Pedro" vê as opções "confirmar" e "cancelar"
    When "Pedro" seleciona a opção "confirmar"
    Then "Pedro" é redirecionado à página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Jessy"

Scenario: Excluir uma Conversa (Cancelada)
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy"
    And "Pedro" vê a opção "excluir conversa" em todas as conversas
    When "Pedro" seleciona a opção "excluir conversa" na conversa com "Bia"
    Then "Pedro" recebe uma mensagem de confirmação "Deseja excluir sua conversa com 'Bia'"?
    And "Pedro" vê as opções "confirmar" e "cancelar"
    When "Pedro" seleciona a opção "cancelar"
    Then "Pedro" é redirecionado à página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy"

Scenario: Selecionar e Abrir uma Conversa
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy"
    When "Pedro" seleciona a conversa com "Bia"
    Then "Pedro" está na página da conversa com "Bia"

Scenario: Buscar uma Conversa (mais de um resultado)
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy", "Bárbara"
    And "Pedro" vê a opção "pesquisar conversa"
    When "Pedro" seleciona a opção "pesquisar conversa"
    And "Pedro" insere a palavra-chave "B"
    Then "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas em ordem alfabética: "Bárbara", "Bia"

Scenario: Buscar uma Conversa (um resultado e acentuações)
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy", "Bárbara"
    And "Pedro" vê a opção "pesquisar conversa"
    When "Pedro" seleciona a opção "pesquisar conversa"
    And "Pedro" insere a palavra-chave "Ba"
    Then "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas em ordem alfabética: "Bárbara"

Scenario: Buscar uma Conversa (nenhum resultado)
    Given o usuário "Pedro" está na página "conversas recentes"
    And "Pedro" vê as seguintes conversas listadas nesta ordem: "Letícia", "Bia", "Jessy", "Bárbara"
    And "Pedro" vê a opção "pesquisar conversa"
    When "Pedro" seleciona a opção "pesquisar conversa"
    And "Pedro" insere a palavra-chave "Bab"
    Then "Pedro" está na página "conversas recentes"
    And "Pedro" recebe uma mensagem "Nenhum resultado encontrado"
