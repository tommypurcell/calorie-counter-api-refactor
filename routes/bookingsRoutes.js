import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/bookings', async (req, res) => {
  try {
    let sqlquery = 'SELECT * FROM bookings'
    if (req.query.user) {
      sqlquery += ` WHERE user_id = ${req.query.user}`
    }
    sqlquery += ' ORDER BY from_date DESC'
    let { rows } = await db.query(sqlquery)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/bookings/:booking_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `SELECT * FROM bookings WHERE booking_id = ${req.params.booking_id}`
    )
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
