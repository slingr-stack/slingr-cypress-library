// *****************************************************
// These commands are for handler data in Slingr app
// *****************************************************

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

/**
 * Return subtract the time send by parameter to the current Date
 * @param {string} unitTime - e.i:year, day, week, hour, minute
 * @param {string} value - e.i: number
 * @param {string} format - e.i: MM/DD/YYYY
 * @returns {string} 
 */
Cypress.Commands.add('subtractCurrentDate', (value, unitTime, format) => {
    let date = dayjs()
    let date2 = date.subtract(value, unitTime)
    return date2.format(format)
})

/**
 * Return add the days the time send by parameter to the current Date
 * @param {string} unitTime - e.i: year, day, week, hour, minute
 * @param {string} value - e.i: number
 * @param {string} format - e.i: MM/DD/YYYY
 * @returns {string} 
 */
Cypress.Commands.add('addCurrentDate', (value, unitTime, format) => {
    let date = dayjs()
    let date2 = date.add(value, unitTime)
    return date2.format(format)
})