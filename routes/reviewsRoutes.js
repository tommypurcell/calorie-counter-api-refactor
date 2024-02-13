import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/reviews', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM reviews')
  res.json(rows)
})

router.get('/reviews/1', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM reviews')
  res.json(rows[0])
})

export default router
