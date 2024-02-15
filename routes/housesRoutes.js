import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/houses', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM houses')
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/houses/1', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM houses WHERE house_id = 1')
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
