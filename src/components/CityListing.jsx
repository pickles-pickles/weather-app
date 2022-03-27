import { useEffect } from 'react'

const CityListing = () => {
  useEffect(() => {
    const fetchCities = async () => {
      const where = encodeURIComponent(
        JSON.stringify({
          population: {
            $gte: 100000
          }
        })
      )
      const response = await fetch(
        `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=10&order=country&include=country,country.continent&keys=name,country,country.name,country.emoji,country.code,country.continent,country.continent.name,location,cityId,adminCode&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id':
              'Q0dHBgFgmlqMswwkCmcsxcqwMXb7RoecFMbKcMpi', // This is your app's application id
            'X-Parse-REST-API-Key': 'ok8GCKXuljmd6GqowPgig4OXReviYtijpsl4gP9n' // This is your app's REST API key
          }
        }
      )
      const data = await response.json() // Here you have the data that you need
      console.log('CITIES: ', data.results)
    }
    fetchCities()
  }, [])
  return <></>
}

export default CityListing
