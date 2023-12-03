import { createSlice } from '@reduxjs/toolkit'

const newDate = new Date()
const initDate = newDate.toString()

const getDefaultDaysFromToday = () => {
  if (localStorage.getItem('defaultDaysFromToday')) {
    return parseInt(localStorage.getItem('defaultDaysFromToday'))
  } else return 0
}

/* This slice follows a pattern of setters and geeters
    When the components need access to a part of the state, they call the respective getter
    When the components need to modify the state,  they call the respective setter
    Names that DON'T start with "set" or "get", do NOT get or set anything,
    but execute complementary operations, like, fe, converting units 
    Other names than "set" and "get" as fine.
*/
const initialState = {
  date: initDate, //string
  daysFromToday: getDefaultDaysFromToday(),
  myStartDate: 0,
  myEndDate: 7,
  plotStartDate: 0,
  plotEndDate: 7
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action) => {
      const newDate = action.payload
      state.date = newDate.toString()
    },

    setDaysFromToday: (state, action) => {
      if (action.payload) {
        state.daysFromToday = action.payload
      } else {
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const todayInit = new Date()
        const todayStr = todayInit.toString()
        const today = Date.parse(todayStr) // parse today to number
        const secondDate = Date.parse(state.date) //parse date to number
        const daysFromToday = Math.round(
          Math.abs((today - secondDate) / oneDay)
        ) //subtract

        state.daysFromToday = daysFromToday //pass to state
      }
    },
    setPlotStartDate: (state, action) => {
      state.plotStartDate = action.payload
    },
    setPlotEndDate: (state, action) => {
      state.plotEndDate = action.payload
    }
  }
})

export const {
  setDate,
  setDaysFromToday,
  logDate,
  setPlotStartDate,
  setPlotEndDate
} = dateSlice.actions
export const getDaysFromToday = state => state.date.daysFromToday
export const getDate = state => state.date.date
export const getPlotStartDate = state => state.date.plotStartDate
export const getPlotEndDate = state => state.date.plotEndDate

export default dateSlice.reducer
