import { useSelector } from 'react-redux'
import { getTempUnit, getMeanTemp } from '../../rtk/weatherSlice'
import DetailsCard from './DetailsCard'
import DetailsPlot from './DetailsPlot'
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
      <div className='container-fluid'>
        <div className='row '>
          <div className=' col-12 col-md-7 order-2 order-md-1'>
            <h1 className='text-center'>
              Details of daily weather, if you click the cards.{' '}
            </h1>
            <DetailsCard></DetailsCard>
          </div>

          <div className='details-calendar col-12 col-md-4 order-1 order-md-2'>
            <h1 className='text-center'>
              Select range of dates to calculate average
            </h1>
            <DetailsRange></DetailsRange>
            {/* <DetailsCalendar></DetailsCalendar> */}
            <h2>average temp is: {convertTemp(meanTemp)}</h2>
            <div style={{ width: '100%', overflow: 'scroll' }}>
              <DetailsPlot></DetailsPlot>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
