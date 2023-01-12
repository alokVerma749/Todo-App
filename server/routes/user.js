import express from 'express'
const router = express.Router()

import { signup, login, findUser } from '../controllers/user.js'

router.post('/signup', signup)
router.post('/login', login)
router.post('/isUser/', findUser)

export default router