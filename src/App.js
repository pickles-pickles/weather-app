import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Map from './components/Map'

function App () {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/map' element={<Map />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
