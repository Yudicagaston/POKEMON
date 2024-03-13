import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/landing/Landing'
import Home from './components/home/Home'
import FormCreate from './components/form/FormCreate'
import Error from './components/error/Error'
import Detail from './components/detail/Detail'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<FormCreate />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
