import express from 'express'
import { loginUser, registerUser, adminLogin, getUserById, updateUserProfile } from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/get', getUserById)
userRouter.get('/:id', getUserById) // Correct RESTful route-- Fix: this is the correct RESTful route
userRouter.put('/update', authUser, updateUserProfile)

export default userRouter