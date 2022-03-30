import { createSlice } from '@reduxjs/toolkit'

const newDate = new Date()
const initDate = newDate.toString()

const getDefaultDaysFromToday = () => {
  if (localStorage.getItem('defaultDaysFromToday')) {
    return parseInt(localStorage.getItem('defaultDaysFromToday'))
  } else return 0
}

const initialState = {
  date: initDate, //string
  daysFromToday: getDefaultDaysFromToday()
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
    },
    setDaysFromToday: state => {
      const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
      // parse today to number
      const todayInit = new Date()
      const todayStr = todayInit.toString()
      const today = Date.parse(todayStr)
      //parse date to number
      const secondDate = Date.parse(state.date)
      //subtract
      const daysFromToday = Math.round(Math.abs((today - secondDate) / oneDay))
      //pass to state
      state.daysFromToday = daysFromToday

      //const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
    }
  }
})

export const { setDate, getDate, setDaysFromToday } = dateSlice.actions
export const getDaysFromToday = state => state.date.daysFromToday
/*   export const getAllCountriesStats = state => state.countries.countries
  export const getAllCitiesStats = state => state.countries.cities */
export default dateSlice.reducer
