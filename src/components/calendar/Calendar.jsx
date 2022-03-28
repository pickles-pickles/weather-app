import React, { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays } from 'date-fns'
import { useDispatch } from 'react-redux'
import { setDate } from '../../rtk/dateSlice'

const Calendar = () => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date())
  useEffect(() => {}, [])
  console.log('selected date', startDate)
  return (
    <>
      <div className='calendar'>
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date)
            console.log('selected date', startDate)
            dispatch(setDate(date.toString()))
          }}
          maxDate={addDays(new Date(), 8)}
          minDate={addDays(new Date(), 0)}
        >
          <div style={{ color: 'red' }}>Don't forget to check the weather!</div>
        </DatePicker>
      </div>
    </>
  )
}

export default Calendar
