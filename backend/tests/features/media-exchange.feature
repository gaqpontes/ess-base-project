Feature: Media Exchange

Scenario: Obtendo histórico de envio de mídias
    Given o método getMediaConversation retorna uma lista de mídias
    And a mídia com id "123", sender "Bia" e receiver "Leticia" está na lista 
    When uma requisão GET for enviada para "/api/messages/get/Bia/Leticia"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista de mídias
    And a mídia com id "123", sender "Bia" e receiver "Leticia" deve estar na lista 

Scenario: Remoção de mídia inexistente
    Given o método getMessage retorna "undefined"
    When uma requisição DELETE for enviada para "/api/messages/delete/Bia/Leticia/123"
    Then o status da resposta deve ser "500"
    And o JSON da resposta deve conter a mensagem "Message not found"

Scenario: Remoção de mídia enviada por outro usuário
    And o método getMessage retorna uma mídia com id "123", sender "Bia" e receiver "Leticia"
    When uma requisição DELETE for enviada para "/api/messages/delete/Leticia/Bia/123"
    Then o status da resposta deve ser "500"
    And o JSON da resposta deve conter a mensagem "Message not sent by you"







