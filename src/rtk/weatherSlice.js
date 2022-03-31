import { createSlice } from '@reduxjs/toolkit'

/* check the local storage */
const getDefaultTempUnit = () => {
  if (localStorage.getItem('defaultTempUnit')) {
    return localStorage.getItem('defaultTempUnit')
  } else return 'Celsius'
}

const initialState = {
  weatherDaily: [],
  mainWeather: {},
  hourlyWeather: [],
  temp: undefined,
  tempUnit: getDefaultTempUnit(),
  meanTemp: 0
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setDailyWeather: (state, action) => {
      state.weatherDaily = action.payload
    },
    setMainWeather: (state, action) => {
      if (state.weatherDaily.length > 0) {
        state.mainWeather = state.weatherDaily[action.payload]
      }
    },
    setHourlyWeather: (state, action) => {
      state.hourlyWeather = action.payload
    },
    setTempUnit: (state, action) => {
      state.tempUnit = action.payload
    },
    convertTemp: (state, action) => {
      if (state.tempUnit === 'Celsius') {
        action.payload -= 273.15
      } else if (state.tempUnit === 'Fahrenheit') {
        action.payload = 1.8 * (action.payload - 273) + 32
      }
      return action.payload
    },
    setMeanTemp: (state, action) => {
      state.meanTemp = action.payload
    }
  }
})

export const {
  setMainWeather,
  setDailyWeather,
  setHourlyWeather,
  setTempUnit,
  convertTemp,
  setMeanTemp
} = weatherSlice.actions
export const getWeather = state => state.weather.weather
/* this info will be displayed in the main card  */
export const getMainWeather = state => state.weather.mainWeather
/* this info will be displayed in /details  */
export const getWeatherDaily = state => state.weather.weatherDaily
export const getHourlyWeather = state => state.weather.hourlyWeather
/* temp */
export const getTempUnit = state => state.weather.tempUnit
export const getMeanTemp = state => state.weather.meanTemp

export default weatherSlice.reducer
