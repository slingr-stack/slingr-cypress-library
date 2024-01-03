
const timeout = 5000;
Cypress.Commands.overwrite('visit', (visit, ...args) => {
    cy.waitForNetworkIdlePrepare({
        method: 'POST',
        alias: 'visit',
        pattern: 'https://actlabs.slingrs.io/staging/runtime/',
        log: false,
    })
    visit(...args)
    cy.waitForNetworkIdle('@visit', timeout)
})