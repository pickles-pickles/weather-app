import React, { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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
        >
          <div style={{ color: 'red' }}>Don't forget to check the weather!</div>
        </DatePicker>
      </div>
    </>
  )
}

export default Calendar
