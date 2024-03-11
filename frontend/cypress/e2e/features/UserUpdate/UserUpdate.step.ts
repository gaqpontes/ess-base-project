import {Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Scenario: Create Usuario
//Given: create_user.ts

When('o usuário preenche os campos {string} com {string}, {string} com {string}, {string} com {string}, {string} com {string} e {string} com {string} e clica no botão {string}', (oldEmailField:string, Oldemail: string,nameField: string, nameValue: string, emailField: string, emailValue: string, usernameField: string, usernameValue: string, passwordField: string, passwordValue: string, buttonName: string) => {
  cy.getDataCy(oldEmailField).type(Oldemail);
  cy.getDataCy(nameField).type(nameValue);
  cy.getDataCy(emailField).type(emailValue);
  cy.getDataCy(usernameField).type(usernameValue);
  cy.getDataCy(passwordField).type(passwordValue);
  cy.getDataCy(buttonName).click();
});


Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(text);
  });
});

