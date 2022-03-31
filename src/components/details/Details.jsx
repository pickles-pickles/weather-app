import { useSelector } from 'react-redux'
import { getTempUnit, getMeanTemp } from '../../rtk/weatherSlice'
import DetailsCard from './DetailsCard'
import DetailsRange from './DetailsRange'

const Details = () => {
  /* location */

  /* TEMP */
  const tempUnit = useSelector(getTempUnit)
  const meanTemp = useSelector(getMeanTemp)

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
      <div className='d-flex'>
        <DetailsCard></DetailsCard>
        <div className='details-calendar d-flex flex-column align-items-center'>
          <h1 className='text-center'>
            Select range of dates ton calculate average
          </h1>
          <DetailsRange></DetailsRange>
          {/* <DetailsCalendar></DetailsCalendar> */}
          <h2>average temp is: {convertTemp(meanTemp)}</h2>
        </div>
      </div>
    </>
  )
}

export default Details
