import { useDispatch, useSelector } from 'react-redux'
import { getIsFlipped, setIsFlipped } from '../../rtk/animSlice'
import { getLocation } from '../../rtk/locationSlice'
import { getWeatherDaily, getTempUnit } from '../../rtk/weatherSlice'
import DetailsCardFace from './DetailsCardFace'

const DetailsCard = () => {
  const dispatch = useDispatch()

  /* location */
  const currentLocation = useSelector(getLocation)
  const locationName = currentLocation.payload.location.currentLocation.name

  /* TEMP */
  const dailyWeather = useSelector(getWeatherDaily)
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

  const isFlipped = useSelector(getIsFlipped)
  const tempDescription = [
    { myKey: 'day', myVal: 'Mean Temperature: ', isTemp: true },
    { myKey: 'min', myVal: 'Min Temperature: ', isTemp: true },
    { myKey: 'max', myVal: 'Max Temperature: ', isTemp: true }
  ]

  const otherDescription = [
    { myKey: 'humidity', myVal: 'Humidity (%) : ', isTemp: false },
    { myKey: 'pressure', myVal: 'Pressure (mbar): ', isTemp: false },
    { myKey: 'wind_speed', myVal: 'Wind Speed:', isTemp: false }
  ]

  return (
    <>
      <div className='scene'>
        <div
          className={`bg-success details-main-card d-flex flex-wrap justify-content-between ${
            isFlipped ? 'is-flipped' : ''
          }`}
          onClick={() => {
            dispatch(setIsFlipped())
          }}
        >
          <div className='card__face card__face--front'>
            <DetailsCardFace
              dailyWeather={dailyWeather}
              locationName={locationName}
              convertTemp={convertTemp}
              description={tempDescription}
              isFlipped={isFlipped}
            ></DetailsCardFace>
          </div>
          <div className='card__face card__face--back'>
            <DetailsCardFace
              dailyWeather={dailyWeather}
              locationName={locationName}
              convertTemp={convertTemp}
              description={otherDescription}
              isFlipped={!isFlipped}
            ></DetailsCardFace>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsCard
