import Calendar from '../calendar/Calendar'
import UserLocation from '../UserLocation'

const UserSidecard = () => {
  return (
    <>
      <div className='d-flex flex-column'>
        <Calendar></Calendar>
        <UserLocation></UserLocation>
      </div>
    </>
  )
}

export default UserSidecard
