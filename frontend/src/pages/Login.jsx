import { useState } from 'react'
import api from '../api/axios.js'
import { useNavigate , Link } from 'react-router-dom'

function Login() {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async ()=>{
        await api.post("/login" , {
            email,
            password
        })

        navigate('/dashboard')
    }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">

          New user?{" "}

          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Register here
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login
