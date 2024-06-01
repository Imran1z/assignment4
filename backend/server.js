// mongodb+srv://shaikhzimran12334:<password>@cluster0.2upntmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'


const app= express();
app.use(express.json());
app.use(cookieParser());
const MONGO_URL= 'mongodb+srv://shaikhzimran12334:imran12334@cluster0.2upntmw.mongodb.net/tasker?retryWrites=true&w=majority&appName=Cluster0'

const PORT=4000;


mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connected to Mongodb')
app.listen(PORT,()=>{
    console.log('Server is up and running on port:',PORT)
})

}).catch((err)=>{
    console.log(err)
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/task',taskRouter)




app.use((err, req, res, next)=>{
    const statusCode =err.statusCode || 500;
    const message =err.message ||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})