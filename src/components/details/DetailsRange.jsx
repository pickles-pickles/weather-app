import { useDispatch, useSelector } from 'react-redux'
import { getEnd, getStart, setEnd, setStart } from '../../rtk/dateSlice'
import { getWeatherDaily, setMeanTemp } from '../../rtk/weatherSlice'

const DetailsRange = () => {
  const dispatch = useDispatch()
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
        temps += temp
        count++
      }
      return temps / count
    }
    return undefined
  }

  let meanTempToSend = calcMeanTemp()

  return (
    <>
      <div className=''>
        <h2 className='text-center'>Get the average temperature for days:</h2>
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
            <option value={option} key={option}>
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
            <option
              value={option}
              key={option}
              disabled={start + option > 7}
              className={`${start + option > 7 && 'option-disabled'}`}
            >
              {option}
            </option>
          ))}
        </select>
        {/* send value to store */}
        <button
          className='btn btn-secondary d-block mx-auto my-2'
          onClick={() => {
            dispatch(setMeanTemp(meanTempToSend))
          }}
        >
          Calculate mean Temp
        </button>
      </div>
    </>
  )
}

export default DetailsRange
