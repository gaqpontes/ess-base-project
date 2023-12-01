Feature: Adi��o de Contatos na Lista
    As um usu�rio da Lista de Contatos
    I want adicionar novos contatos � lista manualmente
    So that posso manter e gerenciar uma lista atualizada de contatos

Scenario: Adi��o de Novo Contato na Lista
    Given o usu�rio est� na p�gina de "Lista de Contatos"
    When o usu�rio encontra e toca no bot�o de adi��o de novo contato
    Then uma nova tela de inser��o de informa��es do contato � apresentada
    And o usu�rio preenche manualmente as informa��es do novo contato
    when o usu�rio confirma a adi��o do novo contato
    Then o usu�rio � redirecionado de volta � p�gina de "Lista de Contatos"
    And o novo contato est� incorporado � lista de contatos
