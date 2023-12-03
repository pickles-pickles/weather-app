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
          <div className=' col-12 col-md-12 '>
            <h1 className='text-center'>Daily weather details. </h1>
            <p className='text-center'>click the cards</p>
            <DetailsCard></DetailsCard>
          </div>

          <div className='details-calendar col-12 col-md-12 order-1 order-md-2 mt-5'>
            <h1 className='text-center'>
              Select range of dates to calculate average
            </h1>
            <DetailsRange></DetailsRange>
            <h2>
              average temp is: {convertTemp(meanTemp, tempUnit)}{' '}
              {meanTemp ? tempUnit : null}
            </h2>
            <div
              style={{ width: '100%', overflow: 'scroll', marginTop: '50px' }}
            >
              <DetailsPlot></DetailsPlot>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
