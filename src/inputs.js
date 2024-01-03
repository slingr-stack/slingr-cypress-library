// *****************************************************
// These commands are for handler Slingr platform inputs
// *****************************************************

/**
 * Chainable, select the value send by parameter in a dropdown input
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValue', { prevSubject: 'element' }, (subject, value) => {
    cy.wrap(subject).type(value)
    cy.waitForNetworkIdle('GET', 1000, { log: false })
    cy.get('[role="listbox"]').contains(value).click();
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})