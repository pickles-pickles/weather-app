import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getAllCountriesStats } from '../rtk/countriesSlice'
import Dropdown from './Dropdown'

const MenuItems = ({ items, depthLevel }) => {
  const menuItems = useSelector(state => state.MenuItems)
  const [dropdown, setDropdown] = useState(false)

  let ref = useRef()

  /* handle the dropdown show and hide */
  useEffect(() => {
    const handler = event => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown, menuItems])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  const countriesMain = useSelector(getAllCountriesStats)

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
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        /* title */
        <a href='/#'>{items.title}</a>
      )}
    </li>
  )
}

export default MenuItems
