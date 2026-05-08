import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())
connectDb()

app.use("/api/auth/",userRouter)

const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("API is running...........")
})

app.listen(PORT,()=>{
    console.log(`server is connected on: http://localhost:${PORT}`)
    
})