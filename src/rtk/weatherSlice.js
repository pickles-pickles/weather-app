import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  weather: {},
  mainWeather: {}
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      if (state.weather.cod == 429) {
      }
      state.weather = { ...state.weather, weather: action.payload }
    },
    setMainWeather: (state, action) => {
      console.log('hhhhhhhhhhh')
      if (state.weather.daily) {
        console.log('from set main weather if')
        state.mainWeather = state.weather.daily[action.payload].temp.day

        return
      } else {
        console.log('from set main weather else')
        return
      }
    }
    /*   setMainWeather: (state, action) => {
      if (state.weather.daily) {
        state.mainWeather = {
          ...state.mainWeather,
          mainWeather: state.weather.daily[action.payload].temp.day
        }
        console.log(
          'from inside man weather, main weather is',
          state.mainWeather
        )
      } else {
        console.log(
          'from inside man weather, main weather is',
          state.mainWeather
        )
      }
      
    } */
  }
})

export const { setWeather, setMainWeather } = weatherSlice.actions
export const getWeather = state => state.weather.weather
export const getMainWeather = state => state.weather.mainWeather
/* export const getMainDayTemp = (state, action) => {
  if (state.weather.mainWeather.daily) {
    return state.weather.mainWeather.daily[action.payload].temp.day
  } else {
    console.log('lmaoooo')
  }
} */

/*   export const getAllCountriesStats = state => state.countries.countries
  export const getAllCitiesStats = state => state.countries.cities */
export default weatherSlice.reducer
