import React from 'react'
import MainCard from './cards/mainCard/MainCard'
import SideCard from './SideCard'
import UserSidecard from './cards/userSideCard/UserSidecard'
const Home = () => {
  return (
    <>
      <div className='d-flex w-100 justify-content-around home-content'>
        <UserSidecard></UserSidecard>
        <MainCard></MainCard>
        <SideCard></SideCard>
      </div>
    </>
  )
}

export default Home
