import { Then, When } from "@badeball/cypress-cucumber-preprocessor";


When('o usuário preenche os campos {string} com {string} e clica no botão {string}', (emailField: string, emailValue: string, buttonName: string) => {
  cy.getDataCy(emailField).type(emailValue);
  cy.getDataCy(buttonName).click();
});


Then("o usuário deve ver a mensagem {string}", (text: string) => {
  cy.get('#successMessage') 
    .should('be.visible') 
    .invoke('text') 
    .then((actualText) => { 
      expect(actualText.trim()).to.equal(text.trim());
    });
});

When('o usuário preenche os campos {string} com {string} e {string} com {string} e {string} com {string} e {string} com {string} e clica no botão {string}', (tokenField: string, tokenValue: string, emailField: string, emailValue: string, pwdField: string, pwdValue: string, pwdConfirmField: string, pwdConfirmValue: string, buttonName: string) => {
  cy.getDataCy(tokenField).type(tokenValue);
  cy.getDataCy(emailField).type(emailValue);
  cy.getDataCy(pwdField).type(pwdValue);
  cy.getDataCy(pwdConfirmField).type(pwdConfirmValue);
  cy.getDataCy(buttonName).click();
});
  
Then("o usuário deve ver a mensagem de erro {string}", (text: string) => {
  cy.get('#alert') 
    .should('be.visible') 
    .invoke('text') 
    .then((actualText) => { 
      expect(actualText.trim()).to.equal(text.trim());
    });
});

Then("o usuário deve ver a mensagem de sucesso {string}", (text: string) => {
  cy.get('#alert-success') 
    .should('be.visible') 
    .invoke('text') 
    .then((actualText) => { 
      expect(actualText.trim()).to.equal(text.trim());
    });
});