Feature: Contact List 

Scenario: Obter a lista de contatos
    Given o método getAllContacts retorna todos os contatos ordenados por ordem alfabética 
    And o contato com id "1", nome "João Pedro", número "00000000" pertence à lista
    And o contato com id "4", nome "Alice", número "00000004" e mais "É chorona" pertence à lista
    And o contato com id "3", nome "Charlie", número "00000003" e mais "Chamar de Brown" pertence à lista
    When uma requisição GET for enviada para "/api/contacts"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista com os contatos existentes exibidos em ordem alfabética

Scenario: Adicionar um novo contato com sucesso
    Given o método addContact adiciona um novo contato à lista de contatos
    When uma requisição POST for enviada para "/api/contacts/" com os dados: id "2", nome "Bob", número "00000002" e mais "Apelido: Marley"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Contato adicionado com sucesso"
    
Scenario: Informações de um Contato
    Given o método getContactById obtém as Informações de um contato pelo ID dele
    And existe um contato com id "1", nome "João Pedro" e número "00000000" na lista de contatos
    When uma requisição GET for enviada para "/api/contacts/1/info"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter as informações id "1", name "João Pedro", number "00000000" e more ""
