import { useDispatch, useSelector } from 'react-redux'
import { getIsFlipped, setIsFlipped } from '../../rtk/animSlice'
import { getLocation } from '../../rtk/locationSlice'
import { getWeatherDaily } from '../../rtk/weatherSlice'
import DetailsCardFace from './DetailsCardFace'
import { convertTemp } from '../../helpers/otherHelpers'

const DetailsCard = () => {
  const dispatch = useDispatch()

  /* location */
  const currentLocation = useSelector(getLocation)
  const locationName = currentLocation.payload.location.currentLocation.name

  /* TEMP */
  const dailyWeather = useSelector(getWeatherDaily)

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
          className={` details-main-card d-flex flex-wrap justify-content-between ${
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
