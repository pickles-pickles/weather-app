import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import weatherApiKey from '../../apis/weatherApiKey'
import { getLocation } from '../../rtk/countriesSlice'
import { getDate, getDaysFromToday } from '../../rtk/dateSlice'
import {
  getMainWeather,
  setMainWeather,
  setWeather
} from '../../rtk/weatherSlice'

const MainCard = () => {
  const dispatch = useDispatch()
  const mainWeather = useSelector(getMainWeather)

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

  /* weather */

  const fetchWeather = async () => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${weatherApiKey}`
    )
    const stats = await request.json()
    console.log('stats', stats)
    /* dispatch(setWeather(stats)) */
  }

  useEffect(() => {
    fetchWeather()
  }, [lat1])

  useEffect(() => {}, [lat1])
  /* useEffect(() => {
    dispatch(setMainWeather(daysFromToday))
  }, [lat1]) */
  return (
    <>
      <div className='bg-success main-card'>
        <p>date: {date}</p>
        <p>lat {lat}</p>
        <p>lon {lon}</p>
        <p>days from today {daysFromToday} </p>
        <p>main weather </p>
      </div>
    </>
  )
}

export default MainCard
