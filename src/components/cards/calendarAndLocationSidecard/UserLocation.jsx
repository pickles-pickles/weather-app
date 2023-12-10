/* import { useEffect } from 'react' */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getUserLocation,
  setLocation,
  setUserLocation
} from '../../../rtk/locationSlice'
import { fetchWeather } from '../../../rtk/weatherSlice'

const UserLocation = () => {
  // ** geolocation is async, refactor properly
  // *ask for location in an async way
  // * set to state
  // * fetch weather properly
  const userLocation = useSelector(getUserLocation)

  const dispatch = useDispatch()

  // ** ask for user location permission
  function getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success)
      console.log('user geolocation', navigator.geolocation)
    } else {
      console.log('user denied')
    }
  }

  async function success (position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    dispatch(setUserLocation({ lat: lat.toFixed(4), lon: lon.toFixed(4) }))
    dispatch(
      setLocation({
        name: 'device location',
        lat: lat.toFixed(4),
        lon: lon.toFixed(4)
      })
    )
    dispatch(fetchWeather({ lat, lon }, ''))
  }

  // ** handle denial
  // ** let the user insert default location  // input with cords or google maps
  // ** if google maps , route to a different page or to the bottom of current
  return (
    <>
      <h3 className='text-center'>User Location</h3>
      <button
        className='btn btn-secondary mb-2'
        onClick={() => {
          getLocation()
        }}
      >
        Select current location
      </button>

      <Link to='/settings'>
        <button className='btn btn-secondary mb-2 mx-auto d-block'>
          Change default Settings
        </button>
      </Link>
      <p className='text-center'>Current Location</p>
      <p className='text-center'>
        {userLocation.lat
          ? 'lat: ' + userLocation.lat + ' lon: ' + userLocation.lon
          : 'No default location selected'}
      </p>
    </>
  )
}

export default UserLocation
