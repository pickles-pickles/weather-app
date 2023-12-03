import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserLocation, setUserLocation } from '../../../rtk/locationSlice'

const UserLocation = () => {
  const userLocation = useSelector(getUserLocation)
  useEffect(() => {
    console.log('userLocation', userLocation)
    console.log('userLocation lat', userLocation.lat)
  }, [])

  const dispatch = useDispatch()

  // ** ask for user location permission
  function getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log('user denied')
    }
  }

  function showPosition (position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    dispatch(setUserLocation({ lat: lat, lon: lon }))
    return { lat: position.coords.latitude, lon: position.coords.longitude }
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
          dispatch(setUserLocation(getLocation))
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
