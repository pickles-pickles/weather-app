import { combineReducers, configureStore } from '@reduxjs/toolkit'
import locationReducer from '../rtk/locationSlice'
import dateReducer from './dateSlice'
import weatherReducer from './weatherSlice'

export const store = configureStore({
  reducer: combineReducers({
    location: locationReducer,
    date: dateReducer,
    weather: weatherReducer
  })
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
})
