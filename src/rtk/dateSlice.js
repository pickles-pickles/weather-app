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
  daysFromToday: getDefaultDaysFromToday(),
  myStartDate: 0,
  myEndDate: 7,
  start: 0,
  end: 7
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
    },
    setStart: (state, action) => {
      state.start = action.payload
    },
    setEnd: (state, action) => {
      state.end = action.payload
    }
  }
})

export const {
  setDate,
  setDaysFromToday,
  logDate,
  setStart,
  setEnd
} = dateSlice.actions
export const getDaysFromToday = state => state.date.daysFromToday
export const getDate = state => state.date.date
export const getStart = state => state.date.start
export const getEnd = state => state.date.end

export default dateSlice.reducer
