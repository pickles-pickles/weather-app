import React from 'react'
import { useSelector } from 'react-redux'
import { getAllCountriesStats } from '../rtk/countriesSlice'

const CountriesListing = () => {
  const countries = useSelector(getAllCountriesStats)
  console.log('countries from listing is ', countries)
  console.log('and of type ', typeof countries, Array.isArray(countries))
  return (
    <>
      <h1>Countries Listing</h1>
      <div>{JSON.stringify(countries)}</div>
      {/* countries is an array of objects */}
      <hr />
      <div>
        {countries !== [] &&
          countries.map(country => <li key={country.name}>{country.name}</li>)}
      </div>
      <h1>Countries Listing END</h1>
    </>
  )
}

export default CountriesListing
