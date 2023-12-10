import React from 'react'
import { useDispatch } from 'react-redux'
import { setUserLocation } from '../../rtk/locationSlice'
import { setDaysFromToday } from '../../rtk/dateSlice'
import { setTempUnit } from '../../rtk/weatherSlice'

export const SettingsSetters = () => {
  const dispatch = useDispatch()

  const btnTexts = [
    'Today',
    'Tomorrow',
    '+2 days',
    '+3 days',
    '+4 days',
    '+5 days',
    '+6 days',
    '+1 week'
  ]

  /* setters */
  const setSettingsDate = e => {
    switch (e.target.innerText) {
      case 'Today':
        dispatch(setDaysFromToday(0))
        localStorage.setItem('defaultDaysFromToday', '0')
        break
      case 'Tomorrow':
        dispatch(setDaysFromToday(1))
        localStorage.setItem('defaultDaysFromToday', '1')
        break
      case '+2 days':
        dispatch(setDaysFromToday(2))
        localStorage.setItem('defaultDaysFromToday', '2')
        break
      case '+3 days':
        dispatch(setDaysFromToday(3))
        localStorage.setItem('defaultDaysFromToday', '3')
        break
      case '+4 days':
        dispatch(setDaysFromToday(4))
        localStorage.setItem('defaultDaysFromToday', '4')
        break
      case '+5 days':
        dispatch(setDaysFromToday(5))
        localStorage.setItem('defaultDaysFromToday', '5')
        break
      case '+6 days':
        dispatch(setDaysFromToday(6))
        localStorage.setItem('defaultDaysFromToday', '6')
        break
      case '+1 week':
        dispatch(setDaysFromToday(7))
        localStorage.setItem('defaultDaysFromToday', '7')
        break
      default:
        dispatch(setDaysFromToday(0))
        localStorage.setItem('defaultDaysFromToday', '0')
        break
    }
  }

  function setDefaultLocation (position) {
    console.log(
      'Latitude: ' +
        position.coords.latitude +
        'Longitude: ' +
        position.coords.longitude
    )
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    dispatch(setUserLocation({ lat: lat.toFixed(4), lon: lon.toFixed(4) }))
    localStorage.setItem('defaultLat', lat.toString())
    localStorage.setItem('defaultLon', lon.toString())
  }
  /* getters */
  function getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setDefaultLocation)
    } else {
      console.log('user denied')
    }
  }
  return (
    <>
      <h1 className='text-center'>Change Settings</h1>
      {/* date */}
      <h3 className='text-center'>The default date will be</h3>
      <div
        className='btn-group mb-2 flex-wrap'
        role='group'
        aria-label='Button Group'
      >
        {btnTexts.map(t => (
          <button
            type='button'
            className='btn btn-primary settings-date-btn'
            key={t}
            onClick={e => {
              setSettingsDate(e)
            }}
          >
            {t}
          </button>
        ))}
        {/* could have used a map for the btns, todo if i have time */}
      </div>
      {/* temp */}
      <h3 className='text-center mt-2'>Select default temperature units</h3>
      <select
        className='form-select temp-units-form-select-at-settings'
        aria-label='Temperature units'
      >
        <option selected={true}>Temperature units</option>
        <option
          value='Celsius'
          onClick={e => {
            dispatch(setTempUnit(e.target.value))
            localStorage.setItem('defaultTempUnit', e.target.value)
          }}
        >
          Celsius
        </option>
        <option
          value='Fahrenheit'
          onClick={e => {
            dispatch(setTempUnit(e.target.value))
            localStorage.setItem('defaultTempUnit', e.target.value)
          }}
        >
          Fafrenheit
        </option>
      </select>
      {/* location */}
      <h3 className='text-center mt-2'>The default location will be</h3>
      <button
        className='btn btn-dark mt-4 mb-2'
        onClick={() => {
          getLocation()
          dispatch(setUserLocation(getLocation))
        }}
      >
        Current location
      </button>
      <button
        className='btn btn-danger'
        onClick={() => {
          localStorage.clear()
        }}
      >
        Clear Default Settings
      </button>
    </>
  )
}
