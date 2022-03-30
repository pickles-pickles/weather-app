import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import weatherApiKey from '../../../apis/weatherApiKey'
import { getLocation } from '../../../rtk/countriesSlice'
import { getDate, getDaysFromToday } from '../../../rtk/dateSlice'
import {
  getWeather,
  setMainWeather,
  setWeather,
  setTemp,
  setDailyWeather,
  setHourlyWeather,
  getMainWeather,
  getTempUnit
  /* convertTemp */
  /* getTemp */
} from '../../../rtk/weatherSlice'
import TempUnitsSelect from './TempUnitsSelect'

const MainCard = () => {
  const dispatch = useDispatch()
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

  const weather = useSelector(getWeather)
  const mainWeather = useSelector(getMainWeather)
  /* const temp = useSelector(getTemp) */

  const fetchWeather = async () => {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${weatherApiKey}`
    )
    const stats = await request.json()

    /* if api call is successful, set the daily weather []  and the main weather {} */
    if (stats.lat) {
      const temp = stats.daily

      dispatch(setDailyWeather(temp))
      dispatch(setMainWeather(daysFromToday))
      dispatch(setHourlyWeather(stats.hourly))
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [lat])

  /* TEMP */
  const tempUnit = useSelector(getTempUnit)

  const convertTemp = a => {
    if (tempUnit === 'Celsius') {
      console.log('Cel')
      a = (a - 273.15).toFixed(1)
    } else if (tempUnit === 'Fahrenheit') {
      a = (1.8 * (a - 273) + 32).toFixed(1)
      console.log('fah')
    }
    return a
  }

  return (
    <>
      <div className='bg-success main-card'>
        <TempUnitsSelect></TempUnitsSelect>
        <p>date: {date}</p>
        <p>lat {lat}</p>
        <p>lon {lon}</p>
        <p>days from today: {daysFromToday} </p>
        <p>
          Temp: {mainWeather.temp ? convertTemp(mainWeather.temp.day) : null}
        </p>
        <p>
          Temp min:{' '}
          {mainWeather.temp ? convertTemp(mainWeather.temp.min) : null}
        </p>
        <p>
          Temp max:{' '}
          {mainWeather.temp ? convertTemp(mainWeather.temp.max) : null}
        </p>
        <p>
          Sky: {mainWeather.temp ? mainWeather.weather[0].description : null}
        </p>
        <p>Wind speed: {mainWeather.temp ? mainWeather.wind_speed : null}</p>
        <p>
          Humidity: {mainWeather.temp ? mainWeather.humidity + ' %' : null}{' '}
        </p>
        <p> icon: {mainWeather.temp ? mainWeather.weather[0].icon : null}</p>
        {/*  <img
          src={
            mainWeather.temp
              ? require(`${weatherIcons}${mainWeather.weather[0].icon.toString()}.png`)
              : null
          }
          alt=''
          width={'20px'}
          height={'20px'}
        /> */}
        <img
          src={
            mainWeather.temp
              ? require(`../../../assets/weather-icons/${mainWeather.weather[0].icon}.png`)
              : null
          }
          alt=''
          width={'20px'}
          height={'20px'}
        />
      </div>
    </>
  )
}

export default MainCard
