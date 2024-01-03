import dayjs from 'dayjs'

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