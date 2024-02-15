import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/photos', async (req, res) => {
  try {
    if (!req.query.house) {
      res.json({ error: 'house parameter is required' })
    } else {
      let { rows } = await db.query(
        `SELECT * FROM houses_photos WHERE house_id = ${req.query.house}`
      )
      res.json(rows)
    }
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/photos/1', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM houses_photos')
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
