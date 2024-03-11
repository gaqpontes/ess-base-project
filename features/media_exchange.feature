Feature: Envio de mídia
    As a usuário
    I want to enviar e receber mídias
    So that eu possa compartilhar mídias com outros usuários

Scenario: Envio de mídia bem sucedido
    Given o usuário "Bia" está na página "Conversa com Leticia"
    And "Bia" vê a opção "Enviar mídia"
    When "Bia" seleciona "Enviar mídia"
    And "Bia" seleciona a mídia "foto.png" com tamanho de "5mb"
    Then "Bia" vê a mensagem de "Mídia enviada!"

Scenario: Envio de mídia mal sucedido
    Given o usuário "Bia" está na página "Conversa com Leticia"
    And "Bia" vê a opção "Enviar mídia"
    When "Bia" seleciona "Enviar mídia" 
    And "Bia" seleciona a mídia "foto.png" com tamanho de "6mb"
    Then "Bia" vê a mensagem de "Erro!"

Scenario: Remoção bem sucedida de mídia do histórico
    Given o usuário "Leticia" está na página "Conversa com Bia"
    And "Letícia" vê "2" mídias: "foto.png" e "audio.mp3"
    When "Leticia" seleciona "foto.png"
    And "Leticia" seleciona "Excluir"
    And "Leticia" seleciona "Confirmar"
    Then "Leticia" vê a mensagem de "Mídia excluída!"
    And "Letícia" vê "1" mídia: "audio.mp3"

Scenario: Remoção mal sucedida de mídia do histórico
    Given o usuário "Leticia" está na página "Conversa com Bia"
    And "Letícia" vê "2" mídias: "foto.png" e "audio.mp3"
    When "Leticia" seleciona "foto.png"
    And "Leticia" seleciona "Excluir"
    And "Leticia" seleciona "Cancelar"
    Then "Leticia" vê a mensagem de "Operação cancelada"
    And "Letícia" vê "2" mídias: "foto.png" e"audio.mp3"
    
Scenario: Recebimento de mídia bem sucedido
    Given o usuário "Leticia" está na página "Conversa com Bia"
    And "Leticia" vê a opção "Fazer download de mídia"
    When "Leticia" seleciona "Fazer download de mídia"
    And "Leticia" seleciona "Confirmar"
    Then "Leticia" vê a mensagem "Download concluído com sucesso" 
    And "Leticia" vê a mídia "foto.png"

Scenario: Recebimento de mídia mal sucedido
    Given o usuário "Leticia" está na página "Conversa com Bia"
    And "Letícia" vê "0" mídias
    And "Leticia" vê a opção "Fazer download de mídia"
    When "Leticia" seleciona "Fazer download de mídia"
    And "Leticia" seleciona "Cancelar"
    Then "Leticia" vê a mensagem "Operação cancelada" 
    And "Leticia" vê "0" mídias

Scenario: Obter histórico de envio de mídias com sucesso
    Given o método "getMediaConversation" retorna uma lista de mídias
    And a mídia com id "123", media "true", sender "Bia" e receiver "Leticia" está na lista 
    When uma requisão "GET" for enviada para "api/messages/get/Bia/Leticia/"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista de mídias
    And a mídia com id "123", media "true", sender "Bia" e receiver "Leticia" deve estar na lista 

Scenario: Obter histórico de envio de mídias sem sucesso
    Given o método "getMediaConversation" retorna uma lista de mídias
    And há "0" mídias na lista
    When uma requisão "GET" for enviada para "api/messages/get/Bia/Leticia/upload"
    Then o status da resposta deve ser "500"
    And o JSON da resposta deve conter a mensagem "No medias exchanged"

Scenario: Remoção de mídia inexistente
    Given o método getMessage retorna "undefined"
    When uma requisição DELETE for enviada para "/api/messages/delete/Bia/Leticia/123"
    Then o status da resposta deve ser "500"
    And o JSON da resposta deve conter a mensagem "Message not found"

Scenario: Remoção de mídia enviada por outro usuário
    Given o método getMessage retorna uma mídia com id "123", sender "Bia" e receiver "Leticia"
    When uma requisição DELETE for enviada para "/api/messages/delete/Leticia/Bia/123"
    Then o status da resposta deve ser "500"
    And o JSON da resposta deve conter a mensagem "Message not sent by you"

Scenario: Envio de mídia que excede o tamanho máximo permitido
    Given o arquivo "documento.pdf" possui o tamanho de "6mb"
    When uma requisição POST for enviada para "/api/messages/send/Leticia/Bia/upload/documento.pdf"
    Then o status da resposta deve ser "500"
    And o JSON da resposta deve conter a mensagem "Maximum file size exceeded"

Scenario: Envio de mídia que obedece ao tamanho máximo permitido
    Given o arquivo "imagem.pdf" possui o tamanho de "2mb"
    When uma requisição POST for enviada para "/api/messages/send/Leticia/Bia/upload/imagem.pdf"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter a mensagem "File sent succesfully"