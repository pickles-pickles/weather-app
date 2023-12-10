import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWeather } from '../apis/services'
import { getDefaultDaysFromToday } from '../helpers/calendarHelpers'

/* check the local storage */
const getDefaultTempUnit = () => {
  if (localStorage.getItem('defaultTempUnit')) {
    return localStorage.getItem('defaultTempUnit')
  } else return 'Celsius'
}

export const fetchWeather = createAsyncThunk(
  'weather/weather',
  async (location, part) => {
    const { lat, lon } = location
    const response = await getWeather(lat, lon, part)
    const data = await response.json()
    return data
  }
)
/* This slice follows a pattern of setters and geeters
    When the components need access to a part of the state, they call the respective getter
    When the components need to modify the state,  they call the respective setter
    Names that DON'T start with "set" or "get", do NOT get or set anything,
    but execute complementary operations, like, fe, converting units 
    Other names than "set" and "get" as fine.
*/

const initialState = {
  weather: {},
  weatherDaily: [],
  mainWeather: {},
  hourlyWeather: [],
  temp: undefined,
  tempUnit: getDefaultTempUnit(),
  meanTemp: undefined
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
    setMeanTemp: (state, action) => {
      state.meanTemp = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.isLoading = true
        state.success = false
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })

      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload
        state.weatherDaily = action.payload.daily
        state.hourlyWeather = action.payload.hourly
        state.mainWeather = action.payload.daily
          ? action.payload.daily[getDefaultDaysFromToday()]
          : {}
        state.isLoading = false
        state.success = true
        state.error = false
      })
  }
})

export const {
  setMainWeather,
  setDailyWeather,
  setHourlyWeather,
  setTempUnit,
  setMeanTemp
} = weatherSlice.actions
//the data respponse from the API
export const getFullWeather = state => state.weather.weather
/* this info will be displayed in the main card  */
export const getMainWeather = state => state.weather.mainWeather
/* this info will be displayed in /details  */
export const getWeatherDaily = state => state.weather.weatherDaily
export const getHourlyWeather = state => state.weather.hourlyWeather
/* temp */
export const getTempUnit = state => state.weather.tempUnit
export const getMeanTemp = state => state.weather.meanTemp

export default weatherSlice.reducer
