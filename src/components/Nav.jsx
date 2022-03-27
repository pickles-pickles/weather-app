import MenuItems from './MenuItems'
import { menuItems } from '../menuItems'

const Nav = () => {
  return (
    <>
      <header>
        <div className='nav-area'>
          <a href='/#' className='logo'>
            Logo
          </a>
          <nav>
            <ul className='menus'>
              {menuItems.map((menu, index) => {
                const depthLevel = 0
                return (
                  <MenuItems items={menu} key={index} depthLevel={depthLevel} />
                )
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Nav
