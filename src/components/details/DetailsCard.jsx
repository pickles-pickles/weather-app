import { useDispatch, useSelector } from 'react-redux'
import { getIsFlipped, setIsFlipped } from '../../rtk/animSlice'
import { getLocation } from '../../rtk/locationSlice'
import { getTempUnit, getWeatherDaily } from '../../rtk/weatherSlice'
import { convertTemp } from '../../helpers/otherHelpers'

const DetailsCard = () => {
  const dispatch = useDispatch()

  /* location */
  const currentLocation = useSelector(getLocation)
  const locationName = currentLocation.name

  /* TEMP */
  const dailyWeather = useSelector(getWeatherDaily)

  const isFlipped = useSelector(getIsFlipped)
  const tempDescription = [
    { myKey: 'day', myVal: 'Day Temperat.: ', isTemp: true },
    { myKey: 'min', myVal: 'Min Temperat.: ', isTemp: true },
    { myKey: 'max', myVal: 'Max Temperat.: ', isTemp: true }
  ]

  const otherDescription = [
    { myKey: 'humidity', myVal: 'Humidity (%) : ', isTemp: false },
    { myKey: 'pressure', myVal: 'Pressure (mbar): ', isTemp: false },
    { myKey: 'wind_speed', myVal: 'Wind Speed:', isTemp: false }
  ]

  const tempUnit = useSelector(getTempUnit)
  return (
    <>
      <div className='scene'>
        <div
          className={`  d-flex flex-wrap justify-content-between `}
          onClick={() => {
            dispatch(setIsFlipped())
          }}
        >
          {dailyWeather.length > 0 &&
            !isFlipped &&
            dailyWeather.map(day => (
              <div
                className='card d-flex flex-row flex-wrap my-2 '
                key={day.dt}
              >
                <div className='card-body'>
                  <h5 className='card-title'>{locationName}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    {`${new Date(day.dt * 1000).getFullYear()} /
                      ${new Date(day.dt * 1000).getMonth() + 1} / ${new Date(
                      day.dt * 1000
                    ).getDate()}`}
                  </h6>
                  {tempDescription.map(pair => (
                    <p className='card-text' key={pair.myKey}>
                      {pair.myVal}:{' '}
                      {pair.isTemp
                        ? convertTemp(day.temp[pair.myKey], tempUnit)
                        : day[pair.myKey]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          {dailyWeather.length > 0 &&
            isFlipped &&
            dailyWeather.map(day => (
              <div
                className='card  d-flex flex-row flex-wrap my-2'
                key={day.dt}
              >
                <div className='card-body'>
                  <h5 className='card-title'>{locationName}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    {`${new Date(day.dt * 1000).getFullYear()} /
                      ${new Date(day.dt * 1000).getMonth() + 1} / ${new Date(
                      day.dt * 1000
                    ).getDate()}`}
                  </h6>
                  {otherDescription.map(pair => (
                    <p className='card-text' key={pair.myKey}>
                      {pair.myVal}:{' '}
                      {pair.isTemp
                        ? convertTemp(day.temp[pair.myKey], tempUnit)
                        : day[pair.myKey]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {!dailyWeather.length && (
          <h3 className='text-center bg-warning'>Select Location</h3>
        )}
      </div>
    </>
  )
}

export default DetailsCard
