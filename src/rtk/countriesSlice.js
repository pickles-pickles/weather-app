import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  countries: []
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountries: (state, action) => {
      /* countries is an array of objects */

      state.countries = action.payload
      state = { ...state, countries: action.payload }
    }
  },
  extraReducers: {}
})

export const { addCountries } = countriesSlice.actions
export const getAllCountriesStats = state => state.countries.countries
export default countriesSlice.reducer
