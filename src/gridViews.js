// **********************************************************
// These commands are for handler Slingr platform grid views
// **********************************************************

/**
 * Find the Row that contains the string send by parameters and return the row content in a grid view
 * @param {string} record - string to identify the row
 * @returns {Array}
 */
Cypress.Commands.add('getRowByContent', (record) => {
    elements = "td [data-element-id='value-undefined'] div div div, td [data-element-id='value-undefined'] span, .relationship-content .label.label-default"
    list = []
    cy.contains(record)
        .parents("tr")
        .within(() => {
            cy.get(elements).each(($el, index, $list) => {
                list.push($el.text())
            })
        }).then(() => {
            return list
        })
})

/**
 * Find the Row by the index send by parameters and return the row content in a grid view
 * @param {number} index - index of the row
 * @returns {Array}
 */
Cypress.Commands.add('getRowByIndex', (index) => {
    elements = "td [data-element-id='value-undefined'] div div div, td [data-element-id='value-undefined'] span, .relationship-content .label.label-default"
    list = []
    header = 0
    cy.get("thead tr").each(($el, index, $list) => {
        header = $list.length
    }).then(() => {
        cy.get("tbody > tr")
            .eq(index + header - 1)
            .within(() => {
                cy.get(elements).each(($el, index, $list) => {
                    list.push($el.text())
                })
            }).then(() => {
                return list
            })
    })
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
Cypress.Commands.add("getTableValueByRecord", function getTableValueByRecord(columnName, record) {
    cy.log('getTableValueByRecord')
    cy.contains('th', columnName)
        .invoke('index')
        .then((index) => {
            return cy.contains('td', record)
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
});

/**
 * Returns the value of the record column (exact match) sent by parameter
 * e.i:
 * | Profile | Status   | Date |
 * ---------------------------
 * | Micro   | New      | 1/12 |
 * ---------------------------
 * | Water   | Verified | 2/09 |
 * -----------------------------
 * cy.getTableDataByRecord("Status", "Micro") => return "New"
 @param {string} columnName - The column name of the table
 @param {string} record - The record (row, exact match)
 @returns {string} - return 1 value of the table
 */
Cypress.Commands.add("getTableValueByExactMatchRecord", function getTableValueByExactMatchRecord(columnName, record) {
    const log = Cypress.log({
        name: 'getTableValueByExactMatchRecord',
        displayName: 'getTableValueByExactMatchRecord: ',
        message: `TO BE DEPRECATED: use getTableValueByExactMatchRecordEC`,
    })
    let regex = new RegExp("^" + record + "$")
    cy.contains('th', columnName)
        .invoke('index')
        .then((index) => {
            return cy.contains(regex).parents('td')
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
});

/**
 * Returns the value of the record column (exact match) sent by parameter
 * Works with special characters
 * e.i:
 * | Profile | Status   | Date |
 * ---------------------------
 * | Micro   | New      | 1/12 |
 * ---------------------------
 * | Water   | Verified | 2/09 |
 * -----------------------------
 * cy.getTableValueByExactMatchRecordEC("Status", "Micro") => return "New"
 @param {string} columnName - The column name of the table
 @param {string} record - The record (row, exact match)
 @returns {string} - return 1 value of the table
 */
Cypress.Commands.add("getTableValueByExactMatchRecordEC", function getTableValueByExactMatchRecordEC(columnName, record) {
    const log = Cypress.log({
        name: 'getTableValueByExactMatchRecordEC',
        displayName: 'getTableValueByExactMatchRecordEC: ',
        message: `Column: ${columnName}, Record: ${record}`,
    })
    let regex = new RegExp(`^${Cypress._.escapeRegExp(record)}$`)
    cy.contains('th', columnName)
        .invoke('index')
        .then((index) => {
            return cy.contains(regex).parents('td')
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
});

/**
 * Find the Row that contains the string send by parameters and click the row's checkbox
 * @param {string} record - string to identify the row
 */
Cypress.Commands.add('checkRow', (record) => {
    tableCheckboxes = 'td:first .select-box'
    cy.contains(record).parents('tr').find(tableCheckboxes).click()
})

/**
 * Find the Row that contains the string send by parameters and click on the kehub menu
 * @param {string} record - string to identify the row
 * @param {string} optionMenu - menu option to select
 */
Cypress.Commands.add('kehubMenu', (record, optionMenu) => {
    kehub = '.table-cell-action span:first'
    cy.contains(record).parents('tr').find(kehub).click({ force: true })
    cy.get("li > a").contains(optionMenu, { matchCase: false }).click({ force: true })
})

/**
 * Filter the records by the column and value send by parameter
 * @param {string} column - column to be filtered
 * @param {string} value - value 
 */
Cypress.Commands.add('filterBy', (column, value) => {
    searchField = '.search-field'
    cy.contains('th', column)
        .invoke('index')
        .then((index) => {
            cy.get(searchField)
                .eq(index - 1)
                .type("{selectAll}" + value + "{enter}", { delay: 40 })
        })
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
})

/**
 * Click on the quick filter send by parameter
 * @param {string} option - Name of the quick filter
 */
Cypress.Commands.add('quickFilterBy', (option) => {
    quickFilters = '.quick__filters li a'
    cy.get(quickFilters).contains(option).click()
})
