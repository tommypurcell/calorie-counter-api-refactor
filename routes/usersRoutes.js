import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/users', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM users')
  res.json(rows)
})

router.get('/users/1', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM users WHERE user_id = 1')
  res.json(rows[0])
})

export default router
