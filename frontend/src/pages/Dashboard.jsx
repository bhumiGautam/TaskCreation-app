import React from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'


const Dashboard = () => {
  const navigate = useNavigate()

  const logout = async () => {

    await api.post("/logout")

    navigate("/")
  }

  return(

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <TaskForm/>
      <TaskList/>

    </div>
  )
}

export default Dashboard
