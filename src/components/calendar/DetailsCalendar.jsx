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
import { convertTemp, getWeatherDaily } from '../../rtk/weatherSlice'

const DetailsCalendar = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const dispatch = useDispatch()
  const myStartDate = useSelector(getStartDate)
  const myEndDate = useSelector(getEndDate)
  const dailyWeather = useSelector(getWeatherDaily)

  const calcDaysFromToday = date => {
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    // parse today to number
    const todayInit = new Date()
    const todayStr = todayInit.toString()
    const today = Date.parse(todayStr)
    //parse date to number
    const secondDate = Date.parse(date)
    //subtract
    return Math.round(Math.abs((today - secondDate) / oneDay))
    //pass to state

    //const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
  }

  const calcMean = () => {
    let temps = 0,
      count = 1,
      temp = 0
    console.log('templll', temp)
    if (myStartDate !== null && myEndDate !== null && dailyWeather.length > 1) {
      for (let i = myStartDate; i <= myEndDate; i++) {
        console.log('hi from inside the loop')
        temp = dailyWeather[i].temp.day
        console.log('temp', temp)
        temps += temp
        count++
      }
      return convertTemp(temps / count)
    }
  }

  useEffect(() => {
    if (myStartDate !== null && myEndDate !== null) {
      calcMean()
      console.log('mean', typeof calcMean() /* calcMean().payload */)
      if (calcMean()) {
        console.log(calcMean().payload)
      }
    }
  }, [myEndDate])

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
          dispatch(setMyStartDate(parseInt(calcDaysFromToday(dateRange[0]))))
          dispatch(setMyEndDate(parseInt(calcDaysFromToday(dateRange[1]))))
        }}
        withPortal
        maxDate={addDays(new Date(), 7)}
        minDate={addDays(new Date(), 0)}
      />
    </>
  )
}

export default DetailsCalendar
