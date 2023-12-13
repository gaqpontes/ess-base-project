Feature: Envio de mídia
    As a usuário
    I want to enviar e receber mídias
    So that eu possa compartilhar mídias com outros usuários

Scenario: Compartilhamento de mídia com sucesso
    Given o usuário "Bia" possui o usuário "Leticia" em sua lista de contatos
    And "Bia" está na página de sua conversa com "Leticia"
    When "Bia" seleciona a mídia "foto.png" para envio
    And "foto.png" tem tamanho igual ou menor ao tamanho máximo permitido
    Then "foto.png" é compartilhada com "Leticia"

Scenario: Falha no compartilhamento de mídia
    Given o usuário "Bia" possui o usuário "Leticia" em sua lista de contatos
    And "Bia" está na página de sua conversa com "Leticia"
    When "Bia" seleciona a mídia "foto.png" para envio
    And "foto.png" tem tamanho maior que ao tamanho máximo permitido
    Then "foto.png" não é compartilhada com "Leticia"

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

