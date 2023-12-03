import { useSelector } from 'react-redux'
import { getTempUnit } from '../../rtk/weatherSlice'

const DetailsCardFace = ({
  dailyWeather,
  locationName,
  convertTemp,
  description,
  isFlipped
}) => {
  const tempUnit = useSelector(getTempUnit)
  return (
    <>
      {dailyWeather.length > 0 ? (
        dailyWeather.map(day => (
          <div
            className='card d-flex flex-row flex-wrap my-2'
            key={day.dt}
            style={{ background: 'red' }}
          >
            <div className='card-body'>
              <h5 className='card-title'>{locationName}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>
                {`${new Date(day.dt * 1000).getFullYear()} /
                      ${new Date(day.dt * 1000).getMonth() + 1} / ${new Date(
                  day.dt * 1000
                ).getDate()}`}
              </h6>
              {description.map(pair => (
                <p className='card-text' key={pair.myKey}>
                  {pair.myVal}:{' '}
                  {pair.isTemp
                    ? convertTemp(day.temp[pair.myKey], tempUnit)
                    : day[pair.myKey]}
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1>Please, select a location first</h1>
      )}
    </>
  )
}

export default DetailsCardFace
