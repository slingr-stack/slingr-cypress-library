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
    const log = Cypress.log({
        name: 'selectMainMenuOption',
        displayName: 'Select Main Menu Option: ',
        message: `Option: ${option}`,
    })
    menuOption = '.sidebar__item span'
    cy.get(menuOption).contains(new RegExp(`^${option}$`, 'i')).click()
})

/**
 * Click on the button send by parameter un the Action menu
 * @param {string} button - The name of the button in the Action menu
 */
Cypress.Commands.add('clickOnActionMenuButton', (button) => {
    cy.scrollTo("top", { ensureScrollable: false })
    actionButton = '#card-header-actions span button'
    cy.get(actionButton).contains(button, { matchCase: false }).click()
})

/**
 * Click on the button send by parameter un the Action menu
 * inclusive if it is hidden in More button
 * @param {string} button - The name of the button in the Action menu
 */
Cypress.Commands.add('clickOnActionMenuButtonAssert', (button) => {
    cy.scrollTo("top", { ensureScrollable: false })
    actionButton = '#card-header-actions span button'
    buttonOptions = '#card-header-actions li a'
    cy.get('body').find(actionButton).invoke('text').then(($el) => {
        if (!$el.includes(button)) {
            cy.get(actionButton).contains('More').click()
            cy.wait(1500)
            cy.get(buttonOptions).contains(button, { matchCase: false }).click()
        } else {
            cy.get(actionButton).contains(button, { matchCase: false }).click()
        }
    })
})

/**
 * Click on notification button in Header menu
 */
Cypress.Commands.add('clickOnNotificationButton', () => {
    notificationButton = '.notifications-dropdown'
    cy.get(actionButton).click()
})

/**
 * Click on the button send by parameter in Header menu
 */
Cypress.Commands.add('clickOnHeaderMenuButton', (button) => {
    userButton = '.runtimeHeader__nav-item'
    cy.get(userButton).contains(button).click()
})