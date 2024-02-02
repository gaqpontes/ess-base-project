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

Scenario: Remoção de mídia do histórico de conversa
    Given o usuário "Leticia" enviou a mídia "foto.png" para "Bia"
    And "Bia" aceitou o recebimento da mídia "foto.png" enviada por "Letícia"
    When "Bia" solicita ao sistema que remova a mídia "foto.png" do seu histórico de conversa com "Leticia"
    Then o sistema para de armazenar a mídia "foto.png" para o usuário "Bia"
    And "Leticia" ainda pode visualizar "foto.png" no seu historico de conversa com "Bia"
    And "Bia" não pode visualizar "foto.png" no seu histórico de conversa com "Letícia"

Scenario: Consentimento de recebimento de mídia
    Given os usuários "Bia" e "Letícia" trocaram mensagens
    And "Leticia" enviou uma referência à mídia "foto.png" para "Bia"
    When "Bia" solicita ao sistema que faça o download da mídia "foto.png"
    Then o sistema armazena a mídia "foto.png" para "Bia"
    And a mídia "foto.png" é recebida por "Bia"

