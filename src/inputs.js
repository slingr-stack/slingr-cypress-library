// *****************************************************
// These commands are for handler Slingr platform inputs
// *****************************************************

/**
 * Chainable, select the value send by parameter in a dropdown input (exact match)
 * replace special characters
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValue', { prevSubject: 'element' }, (subject, value) => {
    const log = Cypress.log({
        name: 'selectValue',
        displayName: `TO BE DEPRECATED: use selectValueEC`,
        message: `Value: ${value}`,
    })
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    cy.get('[role="listbox"]').contains(new RegExp("^" + escapedValue + "$")).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Chainable, select the value send by parameter in a dropdown input (exact match)
 * Works with special characters
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValueEC', { prevSubject: 'element' }, (subject, value) => {
    const log = Cypress.log({
        name: 'selectValueEC',
        displayName: 'selectValueEC (exact match): ',
        message: `Value: ${value}`,
    })
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    let regex = new RegExp(`^${Cypress._.escapeRegExp(value)}$`)
    cy.get('[role="listbox"]').contains(regex).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Chainable, select the option that start with the value send by parameter in a dropdown input
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValueMatchBeginning', { prevSubject: 'element' }, (subject, value) => {
    const log = Cypress.log({
        name: 'selectValueMatchBeginning',
        displayName: `TO BE DEPRECATED: use selectValueMatchBeginningEC`,
        message: `Value: ${value}`,
    })
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    cy.get('[role="listbox"]').contains(new RegExp("^" + value, "g")).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Chainable, select the option that start with the value send by parameter in a dropdown input
 * Works with special characters
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValueMatchBeginningEC', { prevSubject: 'element' }, (subject, value) => {
    const log = Cypress.log({
        name: 'selectValueMatchBeginningEC',
        displayName: 'selectValueMatchBeginningEC: ',
        message: `Value: ${value}`,
    })

    let regex = new RegExp(`^${Cypress._.escapeRegExp(value)},g`)
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    cy.get('[role="listbox"]').contains(regex).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Chainable, select the value send by parameter in a dropdown input (partial match)
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValueByPartialMatch', { prevSubject: 'element' }, (subject, value) => {
    const log = Cypress.log({
        name: 'selectValueByPartialMatchEC',
        displayName: `TO BE DEPRECATED: use selectValueByPartialMatchEC`,
        message: `Value: ${value}`,
    })
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    cy.get('[role="listbox"]').contains(value).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Chainable, select the value send by parameter in a dropdown input (partial match)
 * Works with special characters
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValueByPartialMatchEC', { prevSubject: 'element' }, (subject, value) => {
    const log = Cypress.log({
        name: 'selectValueByPartialMatchEC',
        displayName: 'selectValueByPartialMatchEC: ',
        message: `Value: ${value}`,
    })
    let regex = new RegExp(Cypress._.escapeRegExp(value))
    cy.wrap(subject).type(value, { delay: 1 })
    cy.waitForNetworkIdle('POST, GET', 1500, { log: false })
    cy.get('[role="listbox"]').contains(regex).click('top');
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})