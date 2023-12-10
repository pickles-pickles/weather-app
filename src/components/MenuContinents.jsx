import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocation, setLocation } from '../rtk/locationSlice'
import ContinentsDropdown from './ContinentsDropdown'
import { fetchWeather } from '../rtk/weatherSlice'

const MenuContinents = ({ items, depthLevel }) => {
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const location = useSelector(getLocation)

  let ref = useRef()

  /* handle the dropdown show and hide */

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    // !! if need ,TEMP TRUE
    window.innerWidth > 960 && setDropdown(false)
  }

  /* test */

  return (
    <li
      className='menu-items'
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* if there is items submenu, show it, else show the title */}
      {items.submenu ? (
        /* submenu */
        <>
          <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown(prev => !prev)}
          >
            {items.title}{' '}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className='arrow' />}
          </button>
          <ContinentsDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        /* title */
        <a
          href='/#'
          onClick={() => {
            //!! set the items.title as location for weather api
            dispatch(setLocation(items.title))
            dispatch(fetchWeather({ lat: location.lat, lon: location.lon }, ''))
          }}
        >
          {items.title}
        </a>
      )}
    </li>
  )
}

export default MenuContinents
