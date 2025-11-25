import express from 'express'
const userRouter = express.Router()

import { startChat, getUserBySession } from '../controllers/user.controller.js'

userRouter.post('/chat', startChat)
userRouter.get('/session/:sessionToken', getUserBySession)

export default userRouter