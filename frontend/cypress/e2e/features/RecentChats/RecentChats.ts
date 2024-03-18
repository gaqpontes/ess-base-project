import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

When('o usuário clica no botão "delete-chat-icon" na conversa com "Bia"', () => {
 cy.get('[data-cy="delete-chat-icon-Bia"]').click();
});

When('o usuário clica no botão "delete-chat-confirm"', () => {
 cy.get('[data-cy="delete-chat-confirm"]').click();
});

Then("o usuário deve ver a conversa com {string} removida", () => {
    cy.get('[data-cy="chat-list"]').should('not.contain', 'Bia');
});
   