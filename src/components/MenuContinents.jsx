import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesStats, findLocation } from '../rtk/locationSlice'
import ContinentsDropdown from './ContinentsDropdown'

const MenuContinents = ({ items, depthLevel }) => {
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const countriesMain = useSelector(getAllCountriesStats)

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
      {items.submenu && countriesMain.length > 0 ? (
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
