// *****************************************************
// These commands are for handler Slingr platform menus
// * Main menu
// * Header menu
// * Action menu
// *****************************************************

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

/**
 * Click on the button send by parameter un the Action menu
 * @param {string} button - The name of the button in the Action menu
 */
Cypress.Commands.add('clickOnActionMenuButton', (button) => {
    cy.scrollTo("top")
    actionButton = '#card-header-actions span > button'
    cy.get(actionButton).contains(button, { matchCase: false }).click()
})

/**
 * Click on notification button in Header menu
 */
Cypress.Commands.add('clickOnNotificationButton', () => {
    notificationButton = '.notifications-dropdown'
    cy.get(actionButton).click()
})

/**
 * Click on user button in Header menu
 */
Cypress.Commands.add('clickOnUserButton', () => {
    userButton = '.runtimeHeader__nav-item-container > span'
    cy.get(userButton).click()
})