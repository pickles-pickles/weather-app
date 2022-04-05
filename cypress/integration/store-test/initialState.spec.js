import { menuItems } from '../../../src/menuItems'

/* const newDate = new Date()
const initDate = newDate.toString()

const getDefaultDaysFromToday = () => {
  if (localStorage.getItem('defaultDaysFromToday')) {
    return parseInt(localStorage.getItem('defaultDaysFromToday'))
  } else return 0
} */

const getDefaultTempUnit = () => {
  if (localStorage.getItem('defaultTempUnit')) {
    return localStorage.getItem('defaultTempUnit')
  } else return 'Celsius'
}

describe('check store', () => {
  it('should load correctly', () => {
    cy.visit('http://localhost:3000/')
  })
  /* CHECK ITS ENTRY OF THE STORE SEPARATELY */
  /* LOCATION */
  it('should access the initial (state) location', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('location')
      .should('deep.equal', {
        countries: [],
        menuItems: menuItems,
        cities: [],
        currentLocation: { name: '', lat: '', lon: '' },
        userLocation: { lat: '', lon: '' }
      })
  })

  /* WEATHER */
  it('should access the initial (state) weather', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('weather')
      .should('deep.equal', {
        weatherDaily: [],
        mainWeather: {},
        hourlyWeather: [],
        temp: undefined,
        tempUnit: getDefaultTempUnit(),
        meanTemp: 0
      })
  })

  /* ANIM */
  it('should access the initial (state) anim', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('anim')
      .should('deep.equal', {
        isFlipped: false
      })
  })
})
/* date has an issue yet, due to its async nature. Fix it in the future */
/* DATE */
/*  it('should access the initial (state) date', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .its('date.date')
      .should('equal', new Date().toString())
  })
 */
/* date: initDate, //string
daysFromToday: getDefaultDaysFromToday(),
myStartDate: 0,
myEndDate: 7,
start: 0,
end: 7 */
