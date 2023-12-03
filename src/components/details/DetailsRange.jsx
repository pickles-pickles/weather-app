import { useDispatch, useSelector } from 'react-redux'
import {
  getPlotEndDate,
  getPlotStartDate,
  setPlotEndDate,
  setPlotStartDate
} from '../../rtk/dateSlice'
import { getWeatherDaily, setMeanTemp } from '../../rtk/weatherSlice'

const DetailsRange = () => {
  const dispatch = useDispatch()
  const start = useSelector(getPlotStartDate)
  const end = useSelector(getPlotEndDate)
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
            handleChange(e, setPlotStartDate)
          }}
        >
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <p>To(days from today):</p>
        {/* select how many days */}
        <select
          className='form-select'
          aria-label='select'
          value={end}
          onChange={e => {
            handleChange(e, setPlotEndDate)
          }}
        >
          {options.map(option => (
            <option
              value={option}
              key={option}
              disabled={start > option}
              className={`${start > option && 'option-disabled'}`}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default DetailsRange
