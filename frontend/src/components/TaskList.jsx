
import api from "../api/axios"
import { useState, useEffect } from "react"

const TaskList = () => {

  const [tasks, setTasks] = useState([])

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")


  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")


  const fetchTasks = async () => {
    const res = await api.get(
      `/tasks?page=${page}&search=${search}&status=${status}`
    )


    const data = res.data
    const tasksFromServer = Array.isArray(data) ? data : data.tasks ?? []

    setTasks(tasksFromServer)
    setPages(data.pages ?? 1)
  }


  const deleteTask = async (id) => {

    await api.delete(`/tasks/${id}`)

    fetchTasks()
  }


  const startEdit = (task) => {
    setEditingTaskId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description)
  }


  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditTitle("")
    setEditDescription("")
  }


  const updateTask = async (id) => {

    await api.put(`/tasks/${id}`, {
      title: editTitle,
      description: editDescription,
    })

    fetchTasks()
    cancelEdit()
  }


  useEffect(() => {
    fetchTasks()
  }, [page, search, status])


  return (

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-semibold mb-4">
        Your Tasks
      </h2>



      <input
        placeholder="Search title"
        className="border p-2 mr-2 mb-3"
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
      />



      <select
        className="border p-2 mb-3"
        onChange={(e) => {
          setPage(1)
          setStatus(e.target.value)
        }}
      >

        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>

      </select>



      {tasks?.map((task) => (

        <div
          key={task._id}
          className="border p-3 mb-3 rounded"
        >

          {editingTaskId === task._id ? (

            <>

              <input
                className="border w-full p-2 mb-2 rounded"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
              />

              <textarea
                className="border w-full p-2 mb-2 rounded"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
              />

              <div className="flex gap-2">

                <button
                  onClick={() => updateTask(task._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>

                <button
                  onClick={cancelEdit}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>

              </div>

            </>

          ) : (

            <div className="flex justify-between">

              <div>

                <p className="font-semibold">
                  {task.title}
                </p>

                <p className="text-gray-500">
                  {task.description}
                </p>

                <p className="text-sm text-gray-400">
                  {task.status}
                </p>

              </div>


              <div className="flex gap-3">

                <button
                  onClick={() => startEdit(task)}
                  className="text-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500"
                >
                  Delete
                </button>

              </div>

            </div>

          )}

        </div>

      ))}




      <div className="flex gap-3 mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-3 py-1"
        >
          Prev
        </button>

        <span>
          Page {page} / {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="border px-3 py-1"
        >
          Next
        </button>

      </div>


    </div>

  )
}

export default TaskList
