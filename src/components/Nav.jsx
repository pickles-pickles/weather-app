//import MenuItems from './MenuItems'
//import { menuItems } from '../menuItems'
import MenuContinents from './MenuContinents'
//import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountriesStats,
  matchCountries,
  addCountries,
  addCities,
  matchCities
} from '../rtk/countriesSlice'

const Nav = () => {
  const menuItems = useSelector(state => state.countries.menuItems)

  /* FETCH COUNTRIES */
  const dispatch = useDispatch()
  const countriesMain = useSelector(getAllCountriesStats)

  const fetchCountries = async () => {
    const response = await fetch(
      'https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=200&order=name&include=continent&excludeKeys=capital,phone,native,currency,shape',
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
    /* console.log('data:', data) */
    /* data.results is an array */
    /* console.log('data.results:', data.results) */
    /* [0] object */
    /* console.log('data.results[0]:', data.results[0]) */
    /* string */
    /* console.log('data.results[0].name:', data.results[0].name) */
    return data.results
  }
  const test = () => {
    fetchCountries().then(countries => {
      if (countriesMain !== []) dispatch(matchCountries())
      /* console.log('FROM MENU CONTINENTS menu items after match: ', menuItems) */
    })
  }

  useEffect(() => {
    /* test() */
    /* console.log('when dd changed visibility, menu Items: ', menuItems)
    console.log('FROM MENU CONTINENTS menu items after match: ', menuItems) */
  }, [])
  /*  */
  /* FETCH CITIES */
  const fetchCities = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        population: {
          $gte: 1000000
        }
      })
    )
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=50&order=country&include=country,country.continent&keys=name,country,country.name,country.emoji,country.code,country.continent,country.continent.name,location,cityId,adminCode&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'Q0dHBgFgmlqMswwkCmcsxcqwMXb7RoecFMbKcMpi', // This is your app's application id
          'X-Parse-REST-API-Key': 'ok8GCKXuljmd6GqowPgig4OXReviYtijpsl4gP9n' // This is your app's REST API key
        }
      }
    )
    const data = await response.json() // Here you have the data that you need
    dispatch(addCities(data.results))
    console.log('CITIES: ', data.results)
  }

  const citiesTest = () => {
    fetchCities().then(cities => {
      if (countriesMain !== []) dispatch(matchCities())
    })
  }

  useEffect(() => {
    citiesTest()
  }, [])
  /*  */
  return (
    <>
      <header>
        <div className='nav-area'>
          <a href='/#' className='logo'>
            Logo
          </a>
          <nav>
            {/*     <ul className='menus'>
              {menuItems.map((menuItem, index) => {
                const depthLevel = 0
                return (
                  <MenuItems
                    items={menuItem}
                    key={index}
                    depthLevel={depthLevel}
                  />
                )
              })}
            </ul> */}
            <ul className='menus'>
              {menuItems.map((continent, index) => {
                const depthLevel = 0
                return (
                  <MenuContinents
                    items={continent}
                    key={index}
                    depthLevel={depthLevel}
                  />
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Nav
