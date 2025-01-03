// *****************************************************
// These commands are for handler Slingr platform inputs
// *****************************************************

/**
 * Chainable, select the value send by parameter in a dropdown input
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValue', { prevSubject: 'element' }, (subject, value) => {
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    //cy.get('[role="listbox"]').contains(new RegExp("^" + value, "g")).click('top');
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    //cy.get('[role="listbox"]').contains(new RegExp("^" + escapedValue + "$", "g")).click('top');
    cy.get('[role="listbox"]').contains(new RegExp("^" + escapedValue + "$")).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})
