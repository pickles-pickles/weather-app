import { combineReducers, configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../rtk/countriesSlice'
import dateReducer from './dateSlice'
import weatherReducer from './weatherSlice'

export const store = configureStore({
  reducer: combineReducers({
    countries: countriesReducer,
    date: dateReducer,
    weather: weatherReducer
  })
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
})
