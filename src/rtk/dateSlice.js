import { createSlice } from '@reduxjs/toolkit'

const newDate = new Date()
const initDate = newDate.toString()

const initialState = {
  date: initDate
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action) => {
      const newDate = action.payload
      console.log('payload', newDate)
      state.date = newDate.toString()
      console.log('is NOT null', state.date)

      //state.date.date = action.payload
    },
    getDate: state => {
      return state.date.date
    }
  }
})

export const { setDate, getDate } = dateSlice.actions
/*   export const getAllCountriesStats = state => state.countries.countries
  export const getAllCitiesStats = state => state.countries.cities */
export default dateSlice.reducer
