// *******************************************************
// These commands are for handler Slingr platform iframes
// *******************************************************

Cypress.Commands.add('getIframeBody', (selector) => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
        .get(selector, { timeout: 5000 })
        .its('0.contentDocument').should('exist')
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
})


/**
 * Returns the value of the record column sent by parameter that is inside a iFrame
 * e.i:
 * | Profile | Status   | Date |
 * ---------------------------
 * | Micro   | New      | 1/12 |
 * ---------------------------
 * | Water   | Verified | 2/09 |
 * -----------------------------
 * cy.iFrameGetTableValueByRecord("iframeSelector","Status", "Micro") => return "New"
 @param {string} iframeSelector - iframe selector
 @param {string} columnName - The column name of the table, exact match
 @param {string} record - The record (row)
 @returns {string} - return 1 value of the table
 */
Cypress.Commands.add('iFrameGetTableValueByRecord', (iframeSelector, columnName, record) => {
    return cy
        .getIframeBody(iframeSelector).contains('th', new RegExp("^" + columnName + "$"))
        .invoke('index')
        .then((index) => {
            cy.getIframeBody(iframeSelector).contains('td', new RegExp("^" + record + "$"))
                .should('have.length', 1)
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
})