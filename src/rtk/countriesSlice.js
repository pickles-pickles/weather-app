import { createSlice } from '@reduxjs/toolkit'
import { menuItems } from '../menuItems'
const initialState = {
  countries: [],
  menuItems: menuItems,
  cities: [],
  currentLocation: { name: '', lat: '', lon: '' },
  userLocation: { lat: '', lon: '' }
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
            // !!
            /* continent.submenu = [
              ...continent.submenu,
              { title: state.countries[i].name }
            ] */
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
      console.log('la', state)

      const continents = state.menuItems[0]
      for (let i = 0; i < state.cities.length; i++) {
        for (let j = 0; j < continents.submenu.length; j++) {
          if (
            state.cities[i].country.continent.name ===
            continents.submenu[j].title
          ) {
            // !! log for check
            /*        console.log('lsls', state.cities[i].country.continent.name, i, j) */
            continents.submenu[j].submenu = [
              ...continents.submenu[j].submenu,
              { title: state.cities[i].name }
            ]
          }
        }
      }
    },
    findLocation: (state, action) => {
      for (let i = 0; i < state.cities.length; i++) {
        if (action.payload === state.cities[i].name) {
          /* set current loc name */
          state.currentLocation.name = state.cities[i].name
          /* set current loc cords */
          state.currentLocation.lat = state.cities[i].location.latitude
          state.currentLocation.lon = state.cities[i].location.longitude
        }
      }
    },
    setUserLocation: (state, action) => {
      if (navigator.geolocation) {
        console.log('allowed')
        state.userLocation.lat = action.payload.lat
        state.userLocation.lon = action.payload.lon
      } else {
        console.log('user denied')
      }

      console.log('dispatched')
    },
    getUserLocation: state => {
      return state.countries.userLocation
    }
  },
  extraReducers: {}
})

export const {
  addCountries,
  matchCountries,
  addCities,
  matchCities,
  findLocation,
  setUserLocation,
  getUserLocation
} = countriesSlice.actions
export const getAllCountriesStats = state => state.countries.countries
export const getAllCitiesStats = state => state.countries.cities
export default countriesSlice.reducer

/*     for (let i = 0; i < state.cities.length; i++) {
        console.log('STATE CITIES', state.cities[i].name)
        const citiesList = continents.submenu[]
        for (let j = 0; j < array.length; j++) {
        }
      } */
