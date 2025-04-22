// *******************************************************
// These commands are for handler Slingr platform iframes
// *******************************************************

Cypress.Commands.add('getIframeBody', function getIframeBody(selector) {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.log('getIframeBody')
    return cy
        .get(selector, { timeout: 5000, log: false })
        .its('0.contentDocument.body', { log: false }).should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap, { log: false })
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
 @returns {string} - return 1 value of the table.
 */
Cypress.Commands.add('iFrameGetTableValueByRecord', function iFrameGetTableValueByRecord(iframeSelector, columnName, record) {
    cy.log('iFrameGetTableValueByRecord')
    let regexC = new RegExp(`^ ${Cypress._.escapeRegExp(columnName)} $`)
    let regexR = new RegExp(`^ ${Cypress._.escapeRegExp(record)} $`)
    cy.getIframeBody(iframeSelector).contains('th', regexC)
        .invoke('index')
        .then((index) => {
            return cy.getIframeBody(iframeSelector).contains('td', new RegExp(Cypress._.escapeRegExp(regexR)))
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
})