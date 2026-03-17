import taskModel from "../models/taskModel.js";

const createTask = async (req,res) =>{
    try {
        const {title , description } = req.body;

    const userId = req.user.id 

    const task = await taskModel.create({
        title,
        description,
        user : userId
    })

    res.status(201).json(task)
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }

}

const getTask = async (req,res) =>{
    try {
        const userId = req.user.id

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const status = req.query.status;
    const search = req.query.search;

    const skip = (page -1)*limit
    let filter = {user:userId}

    if (status) {
        filter.status = status
    }

    if(search){
        filter.title ={
            $regex : search,
            $options : "i"
        }
    }

    const tasks = await taskModel.find(filter)
                        .skip(skip)
                        .limit(limit)

    const total = await taskModel.countDocuments(filter)

    return res
            .status(200)
            .json({
                tasks,
                total,
                page
    })

    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }


}

const updateTask = async (req,res) =>{
    try {
        const taskId = req.params.id
        const userId = req.user.id

        const {title , description , status} = req.body

        const task = await taskModel.findById(taskId)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.user.toString() !== userId) {
            return res.status(403).json({
                message: "Not authorized"
            })
        }

        task.title = title || task.title
        task.description = description || task.description
        task.status = status || task.status

        await task.save()

        res.json({
            message: "Task updated",
            task
        });
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }


}


const deleteTask = async (req,res) =>{
    try {
        const taskId = req.params.id
    const userId = req.user.id

    const task = await taskModel.findById(taskId)

    if (!task) {
        return res.status(404).json({
                message: "Task not found"
            })
    }

    if (task.user.toString() !== userId) {
            return res.status(403).json({
                message: "Not authorized"
            })
        }

        await task.deleteOne()

        res.json({
            message: "Task deleted"
        });

    } catch (error) {
       return res.status(500).json({
            message : error.message
        }) 
    }

}

export {createTask , getTask , updateTask , deleteTask}