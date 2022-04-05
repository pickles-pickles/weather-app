import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Details from './components/./details/Details'
import Home from './components/Home'
import Settings from './components/Settings'

function App () {
  return (
    <div>
      <HashRouter>
        <Nav></Nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/details' element={<Details />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
