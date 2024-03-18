Feature: Lista de Conversas Recentes
    As a usuário
    I want ver a lista de conversas recentes ordenada cronologicamente
    So that posso acompanhar as interações mais recentes

Scenario: remoção bem-sucedida de uma conversa
    Given o usuário está na página "chats"
    When o usuário clica no botão "delete-chat-icon" na conversa com "Bia"
    And o usuário clica no botão "delete-chat-confirm"
    Then o usuário deve ver a conversa com "Bia" removida