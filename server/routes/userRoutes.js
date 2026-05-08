import express from 'express'
import { getProfile, login, signup } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.get('/getuser',protect,getProfile)


export default userRouter