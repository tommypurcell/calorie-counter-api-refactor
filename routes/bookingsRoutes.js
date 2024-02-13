import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/bookings', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM bookings')
  res.json(rows)
})

router.get('/bookings/1', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM bookings WHERE booking_id = 1')
  res.json(rows[0])
})

export default router
