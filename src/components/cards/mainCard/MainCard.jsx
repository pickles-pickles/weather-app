import { useSelector } from 'react-redux'
import { getDate, getDaysFromToday } from '../../../rtk/dateSlice'
import {
  getFullWeather,
  getMainWeather,
  getTempUnit
} from '../../../rtk/weatherSlice'
import TempUnitsSelect from './TempUnitsSelect'
import { convertTemp } from '../../../helpers/otherHelpers'

const MainCard = () => {
  /* date */
  const date = useSelector(getDate)

  /* days from today */
  const daysFromToday = useSelector(getDaysFromToday)

  /* weather */
  const weather = useSelector(getFullWeather)
  const mainWeather = useSelector(getMainWeather)
  /* 
  useEffect(() => {
    dispatch(fetchWeather({ lat, lon }, ''))
    console.log('effetc: lat has changed', lat)
    //dispatch(setMainWeather(daysFromToday))
  }, [loc]) */

  /* TEMP */
  const tempUnit = useSelector(getTempUnit)

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
              <p className='main-card-p'>lat: {weather.lat}</p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>lon: {weather.lon}</p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>days from today: {daysFromToday} </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Temp:{' '}
                {mainWeather.temp
                  ? convertTemp(mainWeather.temp.day, tempUnit)
                  : null}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Temp min:{' '}
                {mainWeather.temp &&
                  convertTemp(mainWeather.temp.min, tempUnit)}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Temp max:{' '}
                {mainWeather.temp &&
                  convertTemp(mainWeather.temp.max, tempUnit)}
              </p>
            </li>
            <li className='list-group-item d-flex flex-row align-items-center'>
              {' '}
              <p className='main-card-p'>
                Sky: {mainWeather.temp && mainWeather.weather[0].description}
              </p>
              <img
                src={
                  mainWeather.temp &&
                  require(`../../../assets/weather-icons/${mainWeather.weather[0].icon}.png`)
                }
                alt=''
                width={'40px'}
                height={'40px'}
              />
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Wind speed: {mainWeather.temp && mainWeather.wind_speed}
              </p>
            </li>
            <li className='list-group-item'>
              <p className='main-card-p'>
                Humidity: {mainWeather.temp && mainWeather.humidity + ' %'}{' '}
              </p>
            </li>
          </ul>
        ) : (
          <p className='card-text text-center'>Select a city</p>
        )}
      </div>
    </>
  )
}

export default MainCard
