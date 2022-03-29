import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import weatherApiKey from '../../apis/weatherApiKey'
import { getLocation } from '../../rtk/countriesSlice'
import { getDate, getDaysFromToday } from '../../rtk/dateSlice'

const MainCard = () => {
  /* cords */
  const lat1 = useSelector(getLocation)
  const lat = lat1.payload.countries.currentLocation.lat
  console.log('lat', lat)
  const lon1 = useSelector(getLocation)
  const lon = lon1.payload.countries.currentLocation.lat
  const part = ''

  /* date */
  const date1 = useSelector(getDate)
  const date = date1.payload.date.date
  console.log('date in card', date)

  /* days from today */
  const daysFromToday = useSelector(getDaysFromToday)

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
      <div className='bg-success main-card'>
        <p>date: {date}</p>
        <p>lat {lat}</p>
        <p>lon {lon}</p>
        <p>days from today {daysFromToday} </p>
      </div>
    </>
  )
}

export default MainCard
