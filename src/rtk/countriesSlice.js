import { createSlice } from '@reduxjs/toolkit'
import { menuItems } from '../menuItems'
const initialState = {
  countries: [],
  menuItems: menuItems
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
      /* state.countries.forEach( country =>{
  state.menuItems.submenu.forEach
}) */
      /* loop though the API countries */
      for (let i = 0; i < state.countries.length; i++) {
        const apiCountryContinentName = state.countries[i].continent.name
        /* loop though the menu Items */
        for (let j = 0; j < state.menuItems[0].submenu.length; j++) {
          const continent = state.menuItems[0].submenu[j]
          const continentName = state.menuItems[0].submenu[j].title
          /* if info from api === menu items continent name */
          if (apiCountryContinentName === continentName) {
            console.log(
              state.countries[i].name,
              state.countries[i].continent.name
            )
            continent.submenu = [
              ...continent.submenu,
              { title: state.countries[i].name }
            ]
            console.log('continent submenu from slice', continent.submenu)
            break
          }
        }
      }
    }
  },
  extraReducers: {}
})

export const { addCountries, matchCountries } = countriesSlice.actions
export const getAllCountriesStats = state => state.countries.countries
export default countriesSlice.reducer
