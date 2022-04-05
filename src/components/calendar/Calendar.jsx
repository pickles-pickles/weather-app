import React, { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDaysFromToday,
  setDate,
  setDaysFromToday
} from '../../rtk/dateSlice'
import { setMainWeather } from '../../rtk/weatherSlice'

const Calendar = () => {
  /* select the default date */
  const today = new Date()

  const daysFromToday = useSelector(getDaysFromToday)
  const result = today.setDate(today.getDate() + daysFromToday)
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(result)
  /* change the state default date */
  useEffect(() => {
    /* setDate(1) */
  }, [])

  return (
    <>
      <div className='calendar w-100'>
        <h3 className='text-center'>Weather for day:</h3>
        <h3 className='text-center'> &darr;</h3>
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date)
            /* set date */
            dispatch(setDate(date.toString()))
            /* set days from today */
            dispatch(setDaysFromToday())
            dispatch(setMainWeather(daysFromToday))
          }}
          maxDate={addDays(new Date(), 7)}
          minDate={addDays(new Date(), 0)}
        >
          <div style={{ color: 'red' }}>Don't forget to check the weather!</div>
        </DatePicker>
      </div>
    </>
  )
}

export default Calendar
