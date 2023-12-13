import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Details from './pages/Details'
import Home from './pages/Home'
import Settings from './pages/Settings'

function App () {
  return (
    <div>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/details' element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
