import { useSelector } from 'react-redux'
import { getAllCountriesStats } from '../rtk/locationSlice'
import MenuContinents from './MenuContinents'

const ContinentsDropdown = ({ submenus, dropdown, depthLevel }) => {
  /* items.submenu */
  /* increase depth */
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : ''
  const countriesMain = useSelector(getAllCountriesStats)
  return (
    /* if there is dropdown(=true) , show it, else exit */
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenus && countriesMain !== []
        ? submenus.map((submenu, index) => (
            <MenuContinents
              items={submenu}
              key={index}
              depthLevel={depthLevel}
            />
          ))
        : ''}
    </ul>
  )
}

export default ContinentsDropdown
