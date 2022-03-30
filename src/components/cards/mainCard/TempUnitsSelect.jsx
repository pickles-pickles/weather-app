import { useDispatch } from 'react-redux'
import { setTempUnit } from '../../../rtk/weatherSlice'

const TempUnitsSelect = () => {
  const dispatch = useDispatch()
  return (
    <>
      <select
        class='form-select temp-units-form-select'
        aria-label='Temperature units'
      >
        <option selected>Temperature units</option>
        <option
          value='Celsius'
          onClick={e => {
            dispatch(setTempUnit(e.target.value))
          }}
        >
          Celsius
        </option>
        <option
          value='Fahrenheit'
          onClick={e => {
            dispatch(setTempUnit(e.target.value))
          }}
        >
          Fafrenheit
        </option>
      </select>
    </>
  )
}

export default TempUnitsSelect
