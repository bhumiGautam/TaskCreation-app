import mongoose from 'mongoose'

const dbConnection = async () =>{
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log( " db connected on  " + db.connection.host );
   
}

export default dbConnection