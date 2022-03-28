import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import weatherApiKey from '../apis/weatherApiKey'
import {
  addCountries,
  getAllCountriesStats,
  matchCountries
} from '../rtk/countriesSlice'
import Calendar from './calendar/Calendar'
import Nav from './Nav'

const Home = () => {
  const dispatch = useDispatch()
  const countriesMain = useSelector(getAllCountriesStats)
  const menuItems = useSelector(state => state.countries.menuItems)

  const fetchCountries = async () => {
    const response = await fetch(
      'https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=3&order=name&include=continent&excludeKeys=capital,phone,native,currency,shape',
      {
        headers: {
          'X-Parse-Application-Id': 'Q0dHBgFgmlqMswwkCmcsxcqwMXb7RoecFMbKcMpi', // This is your app's application id
          'X-Parse-REST-API-Key': 'ok8GCKXuljmd6GqowPgig4OXReviYtijpsl4gP9n' // This is your app's REST API key
        }
      }
    )
    const data = await response.json() // Here you have the data that you need
    dispatch(addCountries(data.results))
    /* data is an object ,, key: results , value: array */
    console.log('data:', data)
    /* data.results is an array */
    console.log('data.results:', data.results)
    /* [0] object */
    console.log('data.results[0]:', data.results[0])
    /* string */
    console.log('data.results[0].name:', data.results[0].name)
    return data.results
  }
  const test = () => {
    fetchCountries().then(countries => {
      if (countriesMain !== []) dispatch(matchCountries())
      console.log('menu items after match: ', menuItems)
    })
  }

  return (
    <>
      <Nav></Nav>
      {/* <CountriesListing></CountriesListing> */}
      {/* <CityListing></CityListing> */}
      <Calendar></Calendar>
    </>
  )
}

export default Home
