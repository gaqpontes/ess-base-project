Feature: Envio de mídia
    As a usuário
    I want to enviar e receber mídias
    So that eu possa compartilhar mídias com outros usuários

Scenario: Envio de mídia bem sucedido
    Given o usuário "Bia" está na página de conversa com "Leticia"
    When "Bia" vê a opção "Enviar mídia"
    When "Bia" seleciona "Enviar mídia" e "Bia" seleciona a mídia "foto.png"
    Then "Bia" vê a mensagem de "1" mídia na conversa
    
Scenario: Recebimento de mídia mal sucedido
    Given o usuário "Leticia" está na página de conversa com "Bia"
    When "Leticia" vê a opção "Fazer download de mídia"
    When "Leticia" não seleciona "Fazer download de mídia"
    Then "Leticia" vê "0" mídia na conversa

Scenario: Recebimento de mídia bem sucedido
    Given o usuário "Leticia" está na página de conversa com "Bia"
    When "Leticia" vê a opção "Fazer download de mídia"
    When "Leticia" seleciona "Fazer download de mídia"
    Then "Leticia" vê "1" mídia na conversa


