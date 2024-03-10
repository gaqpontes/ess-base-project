import { Then, When } from "@badeball/cypress-cucumber-preprocessor";


When('o usuário preenche os campos {string} com {string} e {string} com {string} e clica no botão {string}', (emailField: string, emailValue: string, passwordField: string, passwordValue: string, buttonName: string) => {
  cy.getDataCy(emailField).type(emailValue);
  cy.getDataCy(passwordField).type(passwordValue);
  cy.getDataCy(buttonName).click();
});


Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.on("window:alert", (str) => {
    expect(str).to.equal(text);
  });
});
