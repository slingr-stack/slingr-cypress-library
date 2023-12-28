// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@cypress-audit/lighthouse/commands';
import dayjs from 'dayjs'

Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get('.card iframe')
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
  })
  
/**
 * Chainable, select the value send by parameter in a dropdown input
 * @param {string} value - The value to be selected
 */
Cypress.Commands.add('selectValue', { prevSubject: 'element' }, (subject, value) => {
    cy.wrap(subject).type(value)
    cy.waitForNetworkIdle('GET', 1000, { log: false })
    cy.get('[role="listbox"]').contains(value).click();
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Returns the value of the record column sent by parameter
 * e.i:
 * | Profile | Status   | Date |
 * ---------------------------
 * | Micro   | New      | 1/12 |
 * ---------------------------
 * | Water   | Verified | 2/09 |
 * -----------------------------
 * cy.getTableDataByRecord("Status", "Micro") => return "New"
 @param {string} columnName - The column name of the table
 @param {string} record - The record (row)
 @returns {string} - return 1 value of the table
 */
Cypress.Commands.add('getTableDataByRecord', (columnName, record) => {
    return cy
        .contains('th', columnName)
        .invoke('index')
        .then((index) => {
            cy.log(index)
            cy.contains('td', record)
                .should('have.length', 1)
                .siblings()
                .eq(index - 1)
                .invoke('text')

        })
})

/**
 * Return current Date with the format send by parameter
 * @param {string} format - e.i: MM/DD/YYYY
 * @returns {string} 
 */
Cypress.Commands.add('getFormattedDate', (format) => {
    let currentDate = dayjs();
    let formattedDate = currentDate.format(format);
    return formattedDate
})

/**
 * Save orderID in the temporal file runData.json
 * This method overwrite previous order ID saved
 * @param {string} orderID - Order ID to be saved
 */
Cypress.Commands.add('saveOrderID', (orderID, method) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    cy.readFile(filename).then((obj) => {
        if (obj.orders == null) {
            obj.orders = [{ method: method, orderID: orderID }]
        } else {
            obj.orders.push({ method: method, orderID: orderID })
        }
        // write the merged object
        cy.writeFile(filename, obj)
    })
})

/**
 * Returns the order ID for the profile send by parameter from temporal file runData.json
 * @param {string} profile - the profile for the order
 * @returns {string}
 */
Cypress.Commands.add('getOrderID', (method) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    let id;
    cy.readFile(filename).then((obj) => {
        let list = obj.orders
        list.forEach($element => {
            if ($element.method == method) {
                id = $element.orderID
            }
        })
        return id;
    })
})

/**
 * Save sample ID with the profile set in the sample in the temporal file runData.json
 * @param {string} sampleID - sample ID to be saved
 * @param {string} profile - the profile set in the sample
 */
Cypress.Commands.add('saveSampleID', (sampleID, profile) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    cy.readFile(filename).then((obj) => {
        if (obj.samples == null) {
            obj.samples = [{ profile: profile, sampleID: sampleID }]
        } else {
            obj.samples.push({ profile: profile, sampleID: sampleID })
        }
        // write the merged object
        cy.writeFile(filename, obj)
    })
})

/**
 * Returns the sample ID for the profile send by parameter from the temporal file runData.json
 * @param {string} profile - the profile set in the sample
 * @returns {string}
 */
Cypress.Commands.add('getSampleID', (profile) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    let id;
    cy.readFile(filename).then((obj) => {
        let list = obj.samples
        list.forEach($element => {
            if ($element.profile == profile) {
                id = $element.sampleID
            }
        })
        return id;
    })
})

/**
 * Return the number in the sample ID
 * @param {string} sampleID 
 * @returns {string} - sampleIDNumber
 */
Cypress.Commands.add('getSampleIDNumber', (sampleID) => {
    let sampleIDNumber = sampleID.split('-')
    if (sampleIDNumber[sampleIDNumber.length - 1].includes("ST")) {
        return sampleIDNumber[sampleIDNumber.length - 2]
    } else {
        return sampleIDNumber[sampleIDNumber.length - 1]
    }
})

/**
 * Save orderID in the temporal file runData.json
 * This method overwrite previous order ID saved
 * @param {string} orderID - Order ID to be saved
 */
Cypress.Commands.add('saveWorksheetID', (worksheetID, method) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    cy.readFile(filename).then((obj) => {
        if (obj.worksheets == null) {
            obj.worksheets = [{ method: method, worksheetID: worksheetID }]
        } else {
            obj.worksheets.push({ method: method, worksheetID: worksheetID })
        }
        // write the merged object
        cy.writeFile(filename, obj)
    })
})

/**
 * Returns the order ID for the profile send by parameter from temporal file runData.json
 * @param {string} profile - the profile for the order
 * @returns {string}
 */
Cypress.Commands.add('getWorksheetID', (method) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    let id;
    cy.readFile(filename).then((obj) => {
        let list = obj.worksheets
        list.forEach($element => {
            if ($element.method == method) {
                id = $element.worksheetID
            }
        })
        return id;
    })
})
