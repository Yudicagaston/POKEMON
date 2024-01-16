import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/landing/landing'
import Home from './components/home/Home'
import FormCreate from './components/form/FormCreate'
import Error from './components/error/Error'
import Detail from './components/detail/Detail'
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