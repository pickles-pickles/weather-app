import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTempUnit,
  getMeanTemp,
  getWeatherDaily,
  setMeanTemp
} from '../rtk/weatherSlice'
import DetailsCard from '../components/details/DetailsCard'
import DetailsPlot from '../components/details/DetailsPlot'
import DetailsRange from '../components/details/DetailsRange'
import { convertTemp } from '../helpers/otherHelpers'
import { getPlotEndDate, getPlotStartDate } from '../rtk/dateSlice'
import { calcMeanTempForPlot } from '../helpers/calendarHelpers'

const Details = () => {
  const dispatch = useDispatch()
  /* TEMP */
  const tempUnit = useSelector(getTempUnit)
  const meanTemp = useSelector(getMeanTemp)
  const dailyWeather = useSelector(getWeatherDaily)
  const start = useSelector(getPlotStartDate)
  const end = useSelector(getPlotEndDate)

  let meanTempToSend = calcMeanTempForPlot(start, end, dailyWeather)

  useEffect(() => {
    dispatch(setMeanTemp(meanTempToSend))
  }, [dispatch, meanTempToSend])

  return (
    <>
      <div className='container-fluid'>
        <div className='row '>
          <div className=' col-12 col-md-12 '>
            <h1 className='text-center'>Daily weather details</h1>
            {dailyWeather.length > 0 && (
              <p className='text-center'>click the cards</p>
            )}
            <DetailsCard></DetailsCard>
          </div>

          <div className='details-calendar col-12 col-md-12 order-1 order-md-2 mt-5'>
            <h1 className='text-center'>Plots</h1>
            <DetailsRange></DetailsRange>
            <h5 className='mt-3'>
              average temp is: {convertTemp(meanTemp, tempUnit)}{' '}
              {meanTemp ? tempUnit : null}
            </h5>
            {start > end && (
              <p className='text-danger'>start must be before end</p>
            )}
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
