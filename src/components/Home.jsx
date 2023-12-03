import React from 'react'
import MainCard from './cards/mainCard/MainCard'
import SideCard from './SideCard'
import CalendarAndLocationSidecard from './cards/calendarAndLocationSidecard/CalendarAndLocationSidecard'
const Home = () => {
  return (
    <>
      <div className='d-flex w-100 justify-content-around home-content'>
        <CalendarAndLocationSidecard></CalendarAndLocationSidecard>
        <MainCard></MainCard>
        <SideCard></SideCard>
      </div>
    </>
  )
}

export default Home
