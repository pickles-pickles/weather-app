import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import weatherApiKey from '../../apis/weatherApiKey'
import { getLocation } from '../../rtk/countriesSlice'

const MainCard = () => {
  const lat1 = useSelector(getLocation)
  const lat = lat1.payload.countries.currentLocation.lat
  console.log('lat', lat)
  const lon1 = useSelector(getLocation)
  const lon = lon1.payload.countries.currentLocation.lat
  const part = ''

  const fetchWeather = async () => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${weatherApiKey}`
    )
    const stats = await request.json()
    console.log('stats', stats)
  }

  useEffect(() => {
    fetchWeather()
  }, [lat1])
  return (
    <>
      <div className='bg-success main-card'></div>
    </>
  )
}

export default MainCard
