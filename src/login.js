
/**
 * Perform login action usiong session from cypress and navigation for the default main page in slingr solutions.
 * This login save the session in the first test and use it in the followins test.
 * @param {string} username - username
 * @param {string} password - Password
 */
Cypress.Commands.add('login', (username, password) => {
    cy.session(
        username,
        () => {
            cy.visit('/login')
            cy.get("#email").type(username)
            cy.get("#password").type(`${password}{enter}`, { log: false })
            cy.url().should('include', '/63f40037f73d754fbf4715ef')
            cy.get('.runtimeHeader__nav-item-container span').should('not.be.empty')
        },
        {
            validate: () => {
                cy.getCookie('token')
                    .should('exist')
            },
            cacheAcrossSpecs: true
        }
    )
    cy.visit('/')
})
