import { useDispatch, useSelector } from 'react-redux'
import { getStartDate, setMyEndDate, setMyStartDate } from '../rtk/dateSlice'

const DetailsRange = () => {
  const dispatch = useDispatch()
  const startDate = useSelector(getStartDate)
  console.log(startDate, typeof startDate)
  return (
    <>
      <button
        onClick={() => {
          dispatch(setMyStartDate(2))
          dispatch(setMyEndDate(5))
        }}
      >
        Range
      </button>
    </>
  )
}

export default DetailsRange
