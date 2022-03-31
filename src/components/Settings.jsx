import { useDispatch, useSelector } from 'react-redux'
import { getUserLocation, setUserLocation } from '../rtk/locationSlice'
import { getDaysFromToday, setDaysFromToday } from '../rtk/dateSlice'
import { getTempUnit, setTempUnit } from '../rtk/weatherSlice'
import settingsIcon from './../assets/settings-icon.png'

const Settings = () => {
  const dispatch = useDispatch()

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
    dispatch(setUserLocation({ lat: lat, lon: lon }))
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

  const daysFromToday = useSelector(getDaysFromToday)
  const userLocation = useSelector(getUserLocation)
  return (
    <>
      <div className='row'>
        <div className='col-md-6 col-12  d-flex flex-column'>
          {/* date */}
          <h3>The default date will be</h3>
          <div className='btn-group' role='group' aria-label='Basic example'>
            {/* could have used a map for the btns, todo if i have time */}
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              Today
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              Tomorrow
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              +2 days
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              +3 days
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              +4 days
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              +5 days
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              +6 days
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={e => {
                setSettingsDate(e)
              }}
            >
              +1 week
            </button>
          </div>
          {/* temp */}
          <h3>Select default temperature units</h3>
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
          <h3>The default location will be</h3>
          <button
            onClick={() => {
              getLocation()
              dispatch(setUserLocation(getLocation))
            }}
          >
            Current location
          </button>
          <button
            className='btn btn-primary'
            onClick={() => {
              localStorage.clear()
            }}
          >
            Clear Default Settings
          </button>
        </div>
        <div className='col-md-6 col-12  d-flex flex-column'>
          <h1>Current Settings</h1>
          {/* SELECTED SETTINGS */}
          <div class='card'>
            <div className='card-img-top'>
              <img src={settingsIcon} className=' settings-icon' alt='...' />
            </div>

            <div className='card-body'>
              <h5 className='card-title text-center'>Current Settings</h5>
              <p className='card-text text-center'>
                Check your current settings. You can always change them through
                the change default settings section
              </p>
            </div>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item text-center '>
                <p className='fw-bold'>Default days after today:</p>{' '}
                {daysFromToday}
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
        </div>
      </div>
    </>
  )
}

export default Settings
