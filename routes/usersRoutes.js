import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/users', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM users')
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/users/:user_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `SELECT * FROM users WHERE user_id = ${req.params.user_id}`
    )
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
