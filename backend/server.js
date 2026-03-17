import 'dotenv/config'
import express from 'express'
import dbConnection from './config/db.js'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import taskRouter from './routes/taskRoute.js'
const app = express()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/' , userRouter)
app.use('/api/tasks' , taskRouter)

app.listen(process.env.PORT , ()=>{
    console.log(`server is running on port : ${process.env.PORT}`);
    dbConnection()
})