// *****************************************************
// These commands are for handler Slingr platform nested views
// *****************************************************

/**
 * Click on the button send by parameter un the Action menu of aa nested view
 * inclusive if it is hidden in More button
 * @param {string} button - The name of the button in the Action menu
 */
Cypress.Commands.add('clickOnActionMenuButtonInNestedView', (button) => {
    cy.scrollTo("top", { ensureScrollable: false })
    actionButton = '.tabs__container #card-header-actions span button'
    buttonOptions = '.tabs__container #card-header-actions li a'
    cy.get('body').find(actionButton).invoke('text').then(($el) => {
        if (!$el.includes(button)) {
            cy.get(actionButton).contains('More').click()
            cy.get(buttonOptions).contains(button, { matchCase: false }).click()
        } else {
            cy.get(actionButton).contains(button, { matchCase: false }).click()
        }
    })
})