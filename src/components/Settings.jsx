import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setDaysFromToday } from '../rtk/dateSlice'
import { setTempUnit } from '../rtk/weatherSlice'

const Settings = () => {
  const dispatch = useDispatch()

  const setSettingsDate = e => {
    switch (e.target.innerText) {
      case 'Today':
        dispatch(setDaysFromToday(0))
        localStorage.setItem('defaultDaysAfterToday', '0')
        break
      case 'Tomorrow':
        dispatch(setDaysFromToday(1))
        localStorage.setItem('defaultDaysAfterToday', '1')
        break
      case '+2 days':
        dispatch(setDaysFromToday(2))
        localStorage.setItem('defaultDaysAfterToday', '2')
        break
      case '+3 days':
        dispatch(setDaysFromToday(3))
        localStorage.setItem('defaultDaysAfterToday', '3')
        break
      case '+4 days':
        dispatch(setDaysFromToday(4))
        localStorage.setItem('defaultDaysAfterToday', '4')
        break
      case '+5 days':
        dispatch(setDaysFromToday(5))
        localStorage.setItem('defaultDaysAfterToday', '5')
        break
      case '+6 days':
        dispatch(setDaysFromToday(6))
        localStorage.setItem('defaultDaysAfterToday', '6')
        break
      case '+1 week':
        dispatch(setDaysFromToday(7))
        localStorage.setItem('defaultDaysAfterToday', '7')
        break
      default:
        dispatch(setDaysFromToday(0))
        localStorage.setItem('defaultDaysAfterToday', '0')
        break
    }
  }

  return (
    <>
      <div className='d-flex flex-column'>
        {/* location */}
        {/* date */}
        <h3>The default date will be</h3>
        <div className='btn-group' role='group' aria-label='Basic example'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={e => console.log('today', e.target.innerText)}
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
      </div>
    </>
  )
}

export default Settings
