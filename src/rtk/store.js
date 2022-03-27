import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../rtk/countriesSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer
  }
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
})
