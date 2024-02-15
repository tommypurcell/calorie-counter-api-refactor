import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/reviews', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM reviews')
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/reviews/1', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM reviews')
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
