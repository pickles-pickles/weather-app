import { combineReducers, configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../rtk/countriesSlice'
import dateReducer from './dateSlice'

export const store = configureStore({
  reducer: combineReducers({
    countries: countriesReducer,
    date: dateReducer
  })
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
})
