import Calendar from '../../calendar/Calendar'
import UserLocation from './UserLocation'

const CalendarAndLocationSidecard = () => {
  return (
    <>
      <div className='d-flex flex-column user-sidecard'>
        <Calendar></Calendar>
        <UserLocation></UserLocation>
      </div>
    </>
  )
}

export default CalendarAndLocationSidecard
