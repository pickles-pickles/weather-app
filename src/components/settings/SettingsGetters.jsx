import React from 'react'
import { getTempUnit } from '../../rtk/weatherSlice'
import settingsIcon from './../../assets/settings-icon.png'
import { useSelector } from 'react-redux'
import { getDaysFromToday } from '../../rtk/dateSlice'
import { getUserLocation } from '../../rtk/locationSlice'

export const SettingsGetters = () => {
  const daysFromToday = useSelector(getDaysFromToday)
  const userLocation = useSelector(getUserLocation)
  return (
    <>
      <h1 className='text-center'>Current Settings</h1>
      {/* SELECTED SETTINGS */}
      <div className='card'>
        <div className='card-img-top'>
          <img src={settingsIcon} className=' settings-icon' alt='...' />
        </div>

        <div className='card-body'>
          <h5 className='card-title text-center'>Current Settings</h5>
          <p className='card-text text-center'>
            Check your current settings. You can always change them through the
            change default settings section
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item text-center '>
            <p className='fw-bold'>Default days after today:</p> {daysFromToday}
          </li>
          <li className='list-group-item text-center'>
            <p className='fw-bold'>Default temperature unit is: </p>{' '}
            {useSelector(getTempUnit)}
          </li>
          <li className='list-group-item text-center'>
            <p className='fw-bold'>Default Location is: latitude:</p>
            {userLocation.lat ? userLocation.lat : ' not set yet'},
            <p className='fw-bold'>longitude:</p>
            {userLocation.lon ? userLocation.lon : ' not set yet'}
          </li>
        </ul>
      </div>
    </>
  )
}
