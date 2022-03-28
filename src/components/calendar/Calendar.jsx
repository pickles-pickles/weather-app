import React, { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date())
  useEffect(() => {}, [])
  console.log('selected date', startDate)
  return (
    <>
      <div style={{ width: '50opx', height: '300px' }}>
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date)
            console.log('selected date', startDate)
          }}
        >
          <div style={{ color: 'red' }}>Don't forget to check the weather!</div>
        </DatePicker>
      </div>
    </>
  )
}

export default Calendar
