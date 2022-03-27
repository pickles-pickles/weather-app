import { createSlice } from '@reduxjs/toolkit'
import { menuItems } from '../menuItems'
const initialState = {
  countries: [],
  menuItems: menuItems,
  cities: []
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountries: (state, action) => {
      /* countries is an array of objects */

      state.countries = action.payload
      state = { ...state, countries: action.payload }
    },
    matchCountries: state => {
      const continents = state.menuItems[0]
      /* loop though the state countries */
      for (let i = 0; i < state.countries.length; i++) {
        const stateCountryContinentName = state.countries[i].continent.name
        const continentsList = continents.submenu
        /* loop though the menu Items */
        for (let j = 0; j < continentsList.length; j++) {
          const continent = continents.submenu[j]
          const continentName = continents.submenu[j].title
          /* if store continent === menu items continent name */
          if (stateCountryContinentName === continentName) {
            /* add country in continent sub */
            continent.submenu = [
              ...continent.submenu,
              { title: state.countries[i].name }
            ]
            /* console.log(
              state.countries[i].name,
              state.countries[i].continent.name
            ) */
            /* console.log('continent submenu from slice', continent.submenu) */
            break
          }
        }
      }
    },
    addCities: (state, action) => {
      state.cities = action.payload
      state = { ...state, cities: action.payload }
    },
    matchCities: state => {
      const continents = state.menuItems[0]
      /* loop though the state countries */
      for (let i = 0; i < state.countries.length; i++) {
        const stateCountryContinentName = state.countries[i].continent.name
        const continentsList = continents.submenu
        /* loop though the menu Items */
        for (let j = 0; j < continentsList.length; j++) {
          const continent = continents.submenu[j]
          const continentName = continents.submenu[j].title
          /* if store continent === menu items continent name */
          if (stateCountryContinentName === continentName) {
            /* add country in continent sub */
            continent.submenu = [
              ...continent.submenu,
              { title: state.countries[i].name }
            ]
            /* continent.submenu = [
              ...continent.submenu,
              { submenu: [{ title: 'lalala' }] }
            ] */
            console.log(continent.submenu[2])
            /* the above is an array of objects  ,,, array of countries */

            /* console.log(
              state.countries[i].name,
              state.countries[i].continent.name
            ) */
            if (continentName === 'Africa') {
              for (let country in continent.submenu) {
                if (
                  continent.submenu[country].title.toString() === 'Madagascar'
                ) {
                  if (false) {
                    continent.submenu[country] = {
                      ...continent.submenu[country],
                      submenu: [{ title: 'trellooooooo' }]
                    }
                  } else {
                    continent.submenu[country] = {
                      ...continent.submenu[country],
                      submenu: [{ title: 'looooooooooooool' }]
                    }
                  }
                } else {
                  continent.submenu[country] = {
                    ...continent.submenu[country],
                    submenu: [{ title: 'lmao' }]
                  }
                }

                console.log(
                  'continent submenu from slice LMAO',
                  continent.submenu[country]
                )
              }
            }

            break
          }
        }
      }
    }
  },
  extraReducers: {}
})

export const {
  addCountries,
  matchCountries,
  addCities,
  matchCities
} = countriesSlice.actions
export const getAllCountriesStats = state => state.countries.countries
export default countriesSlice.reducer

/*     for (let i = 0; i < state.cities.length; i++) {
        console.log('STATE CITIES', state.cities[i].name)
        const citiesList = continents.submenu[]
        for (let j = 0; j < array.length; j++) {
        }
      } */
