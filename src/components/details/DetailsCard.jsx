import { useSelector } from 'react-redux'
import { getLocation } from '../../rtk/locationSlice'
import { getWeatherDaily, getTempUnit } from '../../rtk/weatherSlice'

const DetailsCard = () => {
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
  return (
    <>
      <div className='scene'>
        <div className='bg-success details-main-card d-flex flex-wrap justify-content-between '>
          {dailyWeather.length > 0 ? (
            dailyWeather.map(day => (
              <div
                className='card d-flex flex-row my-2'
                style={{ width: '48%' }}
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
                  <p className='card-text'>
                    Mean Temperature: {convertTemp(day.temp.day)}
                  </p>
                  <p className='card-text'>
                    Min Temperature: {convertTemp(day.temp.min)}
                  </p>
                  <p className='card-text'>
                    Max Temperature: {convertTemp(day.temp.max)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>Please, select a location first</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailsCard
