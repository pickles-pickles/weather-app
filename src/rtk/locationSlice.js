import { createSlice } from '@reduxjs/toolkit'
import { menuItems } from '../menuItems'
const initialState = {
  countries: [],
  menuItems: menuItems,
  cities: [],
  currentLocation: { name: '', lat: '', lon: '' },
  userLocation: { lat: '', lon: '' }
}
/* 
This is not as clear as the other slices. Fix it, if there is time. ,,, make it follow the seter, getter pattern
*/
const countriesSlice = createSlice({
  name: 'location',
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
          const continentName = continents.submenu[j].title
          /* if store continent === menu items continent name */
          if (stateCountryContinentName === continentName) {
            /* add country in continent sub */
            // !!
            break
          }
        }
      }
    },
    addCities: (state, action) => {
      state.cities = action.payload
      //state = { ...state, cities: action.payload }
    },
    matchCities: state => {
      const continents = state.menuItems[0]
      for (let i = 0; i < state.cities.length; i++) {
        for (let j = 0; j < continents.submenu.length; j++) {
          if (
            state.cities[i].country.continent.name ===
            continents.submenu[j].title
          ) {
            continents.submenu[j].submenu = [
              ...continents.submenu[j].submenu,
              { title: state.cities[i].name }
            ]
          }
        }
      }
    },
    setLocation: (state, action) => {
      //if(state.)
      if (state.cities.length) {
        for (let i = 0; i < state.cities.length; i++) {
          if (action.payload === state.cities[i].name) {
            /* set current loc name */
            state.currentLocation.name = state.cities[i].name
            /* set current loc cords */
            state.currentLocation.lat = state.cities[i].location.latitude
            state.currentLocation.lon = state.cities[i].location.longitude
          }
        }
      } else {
        console.log('else')
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
    }
  },
  extraReducers: {}
})

export const {
  addCountries,
  matchCountries,
  addCities,
  matchCities,
  setLocation,
  setUserLocation
} = countriesSlice.actions
export const getAllCountriesStats = state => state.location.countries
export const getAllCitiesStats = state => state.location.cities
export const getLocation = state => state.location.currentLocation
export const getUserLocation = state => {
  return state.location.userLocation
}
export default countriesSlice.reducer
