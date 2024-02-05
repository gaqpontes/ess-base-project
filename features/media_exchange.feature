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

Scenario: Recebimento de mídia bem sucedido
    Given o usuário "Leticia" está na página "Conversa com Bia"
    And "Leticia" vê a opção "Fazer download de mídia"
    When "Leticia" seleciona "Fazer download de mídia"
    And "Leticia" seleciona "Cancelar"
    Then "Leticia" vê a mensagem "Operação cancelada" 
    And "Leticia" vê a mídia "foto.png"

