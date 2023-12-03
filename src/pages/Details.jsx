import { useSelector } from 'react-redux'
import { getTempUnit, getMeanTemp } from '../rtk/weatherSlice'
import DetailsCard from '../components/details/DetailsCard'
import DetailsPlot from '../components/details/DetailsPlot'
import DetailsRange from '../components/details/DetailsRange'
import { convertTemp } from '../helpers/otherHelpers'

const Details = () => {
  /* TEMP */
  const tempUnit = useSelector(getTempUnit)
  const meanTemp = useSelector(getMeanTemp)

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
            <h2>average temp is: {convertTemp(meanTemp, tempUnit)}</h2>
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
