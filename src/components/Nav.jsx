import MenuContinents from './MenuContinents'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountriesStats,
  addCities,
  matchCities
} from '../rtk/locationSlice'
import { Link } from 'react-router-dom'

const Nav = () => {
  const menuItems = useSelector(state => state.location.menuItems)

  /* FETCH COUNTRIES */
  const dispatch = useDispatch()
  const countriesMain = useSelector(getAllCountriesStats)

  /* const fetchCountries = async () => {
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
    return data.results
  } */

  /* FETCH CITIES ,,, poulation limit: >10^6 */
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
  }

  /* match cities to countries / continents */
  const citiesToMatch = () => {
    fetchCities().then(() => {
      if (countriesMain !== []) dispatch(matchCities())
    })
  }

  useEffect(() => {
    citiesToMatch()
  }, [])
  /*  */
  return (
    <>
      <header>
        <div className='nav-area'>
          <Link to='/'>Home</Link>

          <nav>
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
          <Link to='/settings'>Settings</Link>
          <Link to='/details'>Details</Link>
        </div>
      </header>
    </>
  )
}

export default Nav
