import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.post('/bookings', async (req, res) => {
  try {
    let {
      house_id,
      user_id,
      from_date,
      to_date,
      message,
      price_night,
      price_total
    } = req.body
    let { rows } = await db.query(`
      INSERT INTO bookings (house_id, user_id, from_date, to_date, message, price_night, price_total)
      VALUES ('${house_id}', '${user_id}', '${from_date}', '${to_date}', '${message}', ${price_night}, '${price_total}')
      RETURNING *
    `)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

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
    if (!rows.length) {
      throw new Error(`No booking found with id ${req.params.user_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.delete('/bookings/:booking_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `DELETE FROM bookings WHERE booking_id = ${req.params.booking_id} RETURNING *`
    )
    if (!rows.length) {
      throw new Error(`No booking found with id ${req.params.booking_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
