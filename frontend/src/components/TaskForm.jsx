import api from "../api/axios"
import { useState } from "react"

const TaskForm = () => {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  const createTask = async () => {
    try {
      await api.post("/tasks/create-task", {
        title,
        description,
      })

      setTitle("")
      setDescription("")


      window.location.reload()
    } catch (error) {
      console.error("Create task failed", error?.response?.data || error)
      alert(error?.response?.data?.message || "Failed to create task")
    }
  }

  return(

    <div className="bg-white p-6 rounded shadow mb-6">

      <h2 className="text-xl font-semibold mb-4">
        Create Task
      </h2>

      <input
        className="border w-full p-2 mb-3 rounded"
        placeholder="Task title"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
        className="border w-full p-2 mb-3 rounded"
        placeholder="Description"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button
        onClick={createTask}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>

    </div>
  )

}

export default TaskForm
