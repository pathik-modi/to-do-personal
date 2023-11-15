import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()
// get all tasks
router.get('/', async (req, res) => {
  try {
    await db.getAllTasks().then((todos) => {
      res.json(todos)
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pokemon')
  }
})

// add new task
router.post('/', async (req, res) => {
  try {
    const { taskDetails } = req.body
    await db.addTask(taskDetails)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pokemon')
  }
})
// delete task
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTask(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pokemon')
  }
})

// edit task
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { taskDetails } = req.body
    await db.editTask(id, taskDetails)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pokemon')
  }
})

export default router
