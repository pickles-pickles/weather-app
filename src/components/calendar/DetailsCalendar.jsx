import React, { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  getStartDate,
  getEndDate,
  setMyEndDate,
  setMyStartDate
} from '../../rtk/dateSlice'
import {
  convertTemp,
  getWeatherDaily,
  setMeanTemp
} from '../../rtk/weatherSlice'
import { calcDaysSpan, calcMeanTemp } from '../../helpers/calendarHelpers'

const DetailsCalendar = () => {
  const dispatch = useDispatch()
  const myStartDate = useSelector(getStartDate)
  const myEndDate = useSelector(getEndDate)
  const dailyWeather = useSelector(getWeatherDaily)

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      calcMeanTemp(dateRange, dailyWeather, myStartDate, myEndDate)
      console.log(
        'mean',
        typeof calcMeanTemp(dateRange, dailyWeather, myStartDate, myEndDate)
      )
      if (calcMeanTemp()) {
        console.log(convertTemp(calcMeanTemp().payload))
        dispatch(setMeanTemp(calcMeanTemp().payload))
      }
    }
  }, [dateRange[1]])

  return (
    <>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={update => {
          setDateRange(update)
        }}
        onCalendarClose={update => {
          //setDateRange(update)
          dispatch(setMyStartDate(parseInt(calcDaysSpan(dateRange[0]))))
          dispatch(setMyEndDate(parseInt(calcDaysSpan(dateRange[1]))))
        }}
        withPortal
        maxDate={addDays(new Date(), 7)}
        minDate={addDays(new Date(), 0)}
      />
    </>
  )
}

export default DetailsCalendar
