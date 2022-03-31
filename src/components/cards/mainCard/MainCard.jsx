import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import weatherApiKey from '../../../apis/weatherApiKey'
import { getLocation } from '../../../rtk/locationSlice'
import { getDate, getDaysFromToday } from '../../../rtk/dateSlice'
import {
  setMainWeather,
  setDailyWeather,
  setHourlyWeather,
  getMainWeather,
  getTempUnit
} from '../../../rtk/weatherSlice'
import TempUnitsSelect from './TempUnitsSelect'

const MainCard = () => {
  const dispatch = useDispatch()
  /* cords */
  const lat1 = useSelector(getLocation)
  const lat = lat1.payload.location.currentLocation.lat
  console.log('lat', lat)
  const lon1 = useSelector(getLocation)
  const lon = lon1.payload.location.currentLocation.lat
  const part = ''

  /* date */
  const date = useSelector(getDate)
  /* const date = date1.payload.date.date */

  /* days from today */
  const daysFromToday = useSelector(getDaysFromToday)

  /* weather */

  const mainWeather = useSelector(getMainWeather)

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
  //!! temp commented out
  useEffect(() => {
    fetchWeather()
  }, [lat])

  /* TEMP */
  const tempUnit = useSelector(getTempUnit)

  const convertTemp = a => {
    if (tempUnit === 'Celsius') {
      a = (a - 273.15).toFixed(1)
    } else if (tempUnit === 'Fahrenheit') {
      a = (1.8 * (a - 273) + 32).toFixed(1)
    }
    return a
  }

  return (
    <>
      <div className='card main-card'>
        <div className='card-header d-flex align-items-center justify-content-evenly'>
          {' '}
          <p className='main-card-p'>
            Weather for: {/* i don't want the whole date */}
            {date.slice(0, 11)}
          </p>
          <TempUnitsSelect></TempUnitsSelect>
        </div>

        {mainWeather.moonrise ? (
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              <p className='main-card-p'>lat {lat}</p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>lon {lon}</p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>days from today: {daysFromToday} </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Temp:{' '}
                {mainWeather.temp ? convertTemp(mainWeather.temp.day) : null}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Temp min:{' '}
                {mainWeather.temp ? convertTemp(mainWeather.temp.min) : null}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Temp max:{' '}
                {mainWeather.temp ? convertTemp(mainWeather.temp.max) : null}
              </p>
            </li>
            <li className='list-group-item d-flex flex-row align-items-center'>
              {' '}
              <p className='main-card-p'>
                Sky:{' '}
                {mainWeather.temp ? mainWeather.weather[0].description : null}
              </p>
              <img
                src={
                  mainWeather.temp
                    ? require(`../../../assets/weather-icons/${mainWeather.weather[0].icon}.png`)
                    : null
                }
                alt=''
                width={'40px'}
                height={'40px'}
              />
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Wind speed: {mainWeather.temp ? mainWeather.wind_speed : null}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Humidity:{' '}
                {mainWeather.temp ? mainWeather.humidity + ' %' : null}{' '}
              </p>
            </li>
          </ul>
        ) : (
          <p className='card-text text-center'>Select a city</p>
        )}
      </div>

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
    </>
  )
}

export default MainCard
