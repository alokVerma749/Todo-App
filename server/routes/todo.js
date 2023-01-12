import express from 'express'
const router = express.Router()

import {
    createTodo,
    deleteTodo,
    getTodo,
    getTodos,
    editTodo,
    createTask,
    deleteTask,
    getTasks,
    sortTodo
} from '../controllers/todo.js'

router.post('/createtodo', createTodo)
router.delete('/deletetodo/:todoid', deleteTodo)
router.get('/gettodo/:todoid', getTodo)
router.get('/gettodos', getTodos)
router.put('/editTodo/:todoid', editTodo)
router.post('/createtask/:todoid', createTask)
router.delete('/deletetask/:todoid', deleteTask)
router.get('/gettasks/:todoid', getTasks)
router.get('/sortTodo', sortTodo)

export default router