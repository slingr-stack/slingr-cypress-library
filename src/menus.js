
/**
 * Open the Main menu, if it is closed
 */
Cypress.Commands.add('openMainMenu', () => {
    openMenu = "sidebar-open"
    menu = '#menu-trigger'
    cy.get('body').invoke('attr', 'class').then(($el) => {
        if ($el.includes(openMenu)) {
            cy.log("Menu alredy opened")
        } else {
            cy.get(menu).click()
        }
    })
})

/**
 * Select the option in the main menu send by parameter
 * @param {string} option - The value to be selected
 */
Cypress.Commands.add('selectMainMenuOption', (option) => {
    menuOption = '.sidebar__item span'
    cy.get(menuOption).contains(option, { matchCase: false }).click()

})