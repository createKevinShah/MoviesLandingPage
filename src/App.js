import { Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './components/Login'
import Movies from './components/Movies'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
    </div>
  )
}

export default App
