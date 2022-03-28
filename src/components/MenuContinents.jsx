import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountriesStats,
  matchCountries,
  addCountries,
  findLocation
} from '../rtk/countriesSlice'
import ContinentsDropdown from './ContinentsDropdown'
import Dropdown from './Dropdown'

const MenuContinents = ({ items, depthLevel }) => {
  const dispatch = useDispatch()
  const menuItems = useSelector(state => state.countries.menuItems[0].submenu)
  const [dropdown, setDropdown] = useState(false)
  const countriesMain = useSelector(getAllCountriesStats)

  let ref = useRef()

  /* handle the dropdown show and hide */
  useEffect(() => {
    /* ;(async () => {
      dispatch(matchCountries)
    })() */

    const handler = event => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    // !! TEMP TRUE
    window.innerWidth > 960 && setDropdown(true)
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
      {items.submenu && countriesMain !== [] ? (
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
            console.log('clicked city: ', items.title)
            dispatch(findLocation(items.title))
          }}
        >
          {items.title}
        </a>
      )}
    </li>
  )
}

export default MenuContinents
