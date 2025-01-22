
// **********************************************************
// These commands are for handler Slingr platform modals
// **********************************************************

/**
* Click on a button in a modal's footer in the runtime
* @param {string} button - The button's text
*/
Cypress.Commands.add('clickOnModalButton', (button) => {
    cy.contains('.modal-body button.slingr__button', button).click()
    cy.waitForNetworkIdle('POST, GET', 3000, { log: false })
})

/**
* Click on a confirmation button in a modal's footer in the runtime
* @param {string} button - The button's text
*/
Cypress.Commands.add('clickOnConfirmationModalFooterButton', (button) => {
    cy.contains('.confirmation-modal__footer button.slingr__button', button).click()
    cy.waitForNetworkIdle('POST, GET', 1000, { log: false })
})

/**
* Click on a button in an action modal's footer in the runtime
* @param {string} button - The button's text
*/
Cypress.Commands.add('clickOnActionModalButton', (button) => {
    cy.contains('.actionModal__footer button.slingr__button', button).click()
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})
