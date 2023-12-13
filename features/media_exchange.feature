Feature: Envio de mídia
    As a usuário
    I want to armazenar e remover mídias do histórico de mensagens
    So that eu possa compartilhar mídias com outros usuários

Scenario: Removes media from conversation history
Given os usuários “Bia” e “Letícia” trocaram mensagens
And “Leticia” enviou a mídia “foto.png” para “Bia”
And “Bia” fez o download da mídia “foto.png” enviada por “Letícia”
When “Bia” solicita ao sistema que remova a mídia “foto.png”  do seu histórico de conversa
And o sistema para de armazenar a mídia “foto.png” para “Bia”
And o sistema para de armazenar para “Bia” a mensagem que continha uma referência para “foto.png”
Then a mídia “foto.png” foi removida do histórico de conversa entre “Bia” e “Letícia”

Scenario: Store media for a user
Given os usuários “Bia” e “Letícia” trocaram mensagens
And “Leticia” enviou uma referência à mídia “foto.png” para “Bia”
And o sistema salva a referência à mídia “foto.png”
When “Bia” solicita ao sistema que faça o donload da mídia “foto.png”
Then o sistema armazena a mídia “foto.png” para “Bia”
And a mídia “foto.png” pode ser acessada por “Bia”
Then "Bia" has access to "foto.png"

Scenario: Remove media for single user