import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (

      <Routes >
        <Route path='/' element={ <Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route  path='/dashboard' element={<ProtectedRoute > <Dashboard /></ProtectedRoute>}/>

      </Routes>
  )
}

export default App
