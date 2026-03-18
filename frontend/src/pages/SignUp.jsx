import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate , Link } from "react-router-dom";

function SignUp(){

    const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async () => {
    try {
      setError("")

      await api.post("/register",{
        name,
        email,
        password
      })

      navigate('/dashboard')
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Something went wrong"
      setError(message)
      console.error("Register error:", err)
    }
  }

  return(

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </button>

        {error && (
          <p className="text-sm text-center mt-3 text-red-600">{error}</p>
        )}

        <p className="text-sm text-center mt-4">

          Already have account?{" "}

          <Link
            to="/"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}


export default SignUp
