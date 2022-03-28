import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserLocation, setUserLocation } from '../rtk/countriesSlice'

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
    console.log(
      'Latitude: ' +
        position.coords.latitude +
        'Longitude: ' +
        position.coords.longitude
    )
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
      <h1>User Location</h1>
      <button
        onClick={() => {
          getLocation()
          dispatch(setUserLocation(getLocation))
        }}
      >
        Select current location
      </button>

      <Link to='/map'>
        <button>Select default location</button>
      </Link>
      <p>Current Location</p>
      <p>{userLocation ? '' : 'No default location selected'}</p>
    </>
  )
}

export default UserLocation
