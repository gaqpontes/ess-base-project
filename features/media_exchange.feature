Feature: Envio de mídia
    As a usuário
    I want to enviar e receber mídias
    So that eu possa compartilhar mídias com outros usuários

Scenario: Envio de mídia bem sucedido
    Given o usuário "Bia" vê o usuário "Leticia" na página "Contatos"
    And "Bia" está na página "Conversa com Leticia"
    And "Bia" vê a opção "Enviar mídia"
    When "Bia" seleciona a mídia "foto.png" para envio
    And "foto.png" tem tamanho igual ou menor que "5mb"
    Then "Bia" vê a mensagem de "Mídia enviada!"

Scenario: Envio de mídia mal sucedido
    Given o usuário "Bia" vê o usuário "Leticia" na página "Contatos"
    And "Bia" está na página "Conversa com Leticia"
    And "Bia" vê a opção "Enviar mídia"
    When "Bia" seleciona a mídia "foto.png" para envio
    And "foto.png" tem tamanho maior que "5mb"
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
    
Scenario: Consentimento de recebimento de mídia
    Given os usuários "Bia" e "Letícia" trocaram mensagens
    And "Leticia" enviou uma referência à mídia "foto.png" para "Bia"
    When "Bia" solicita ao sistema que faça o download da mídia "foto.png"
    Then o sistema armazena a mídia "foto.png" para "Bia"
    And a mídia "foto.png" é recebida por "Bia"

