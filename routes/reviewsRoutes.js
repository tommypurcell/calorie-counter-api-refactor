import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/reviews', async (req, res) => {
  try {
    let sqlquery = 'SELECT * FROM reviews'
    if (req.query.house) {
      sqlquery += ` WHERE house_id = ${req.query.house}`
    }
    sqlquery += ' ORDER BY date DESC'
    let { rows } = await db.query(sqlquery)
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
