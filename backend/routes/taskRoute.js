import express from 'express'
import authUser from '../middleware/authMiddleware.js'
import { createTask, deleteTask, getTask, updateTask } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.post('/create-task', authUser , createTask)
taskRouter.get('/' , authUser , getTask)
taskRouter.put('/:id' , authUser , updateTask)
taskRouter.delete('/:id' , authUser , deleteTask)

export default taskRouter