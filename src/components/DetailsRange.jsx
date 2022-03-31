import { useDispatch, useSelector } from 'react-redux'
import { getEnd, getStart, setEnd, setStart } from '../rtk/dateSlice'
import { getWeatherDaily, setMeanTemp } from '../rtk/weatherSlice'

const DetailsRange = () => {
  const dispatch = useDispatch()
  /*   const startDate = useSelector(getStartDate)
  console.log(startDate, typeof startDate) */
  const start = useSelector(getStart)
  const end = useSelector(getEnd)
  const dailyWeather = useSelector(getWeatherDaily)

  const options = [0, 1, 2, 3, 4, 5, 6, 7]
  function handleChange (e, callback) {
    dispatch(callback(parseInt(e.target.value)))
  }

  const calcMeanTemp = (s = start, e = end) => {
    let temps = 0,
      count = 0,
      temp = 0
    if (dailyWeather.length > 1) {
      for (let i = s; i < e; i++) {
        temp = dailyWeather[i].temp.day
        console.log('temp', temp)
        temps += temp
        count++
      }
      return temps / count
    }
    return undefined
  }

  let meanTempToSend = calcMeanTemp()
  console.log(meanTempToSend)

  return (
    <>
      <h1>Get the average temperature for days:</h1>
      <p>From(days from today):</p>
      {/* select the start date */}
      <select
        className='form-select'
        aria-label='select'
        value={start}
        onChange={e => {
          handleChange(e, setStart)
        }}
      >
        {options.map(option => (
          <option value={start} key={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Range of days</p>
      {/* select how many days */}
      <select
        className='form-select'
        aria-label='select'
        value={end}
        onChange={e => {
          handleChange(e, setEnd)
        }}
      >
        {options.map(option => (
          <option value={option} key={option} disabled={start + option > 7}>
            {option}
          </option>
        ))}
      </select>
      {/* send value to store */}
      <button
        onClick={() => {
          dispatch(setMeanTemp(meanTempToSend))
        }}
      >
        Calculate mean Temp
      </button>
    </>
  )
}

export default DetailsRange
