import { Router } from 'express'
const router = Router()
import db from '../db.js'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../secrets.js'

router.post('/bookings', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      throw new Error('Invalid authentication token!')
    }
    let { house_id, from_date, to_date, message, price_night, price_total } =
      req.body
    let { rows } = await db.query(`
      INSERT INTO bookings (house_id, user_id, from_date, to_date, message, price_night, price_total)
      VALUES ('${house_id}', '${decodedToken.user_id}', '${from_date}', '${to_date}', '${message}', ${price_night}, '${price_total}')
      RETURNING *
    `)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/bookings', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      throw new Error('Invalid authentication token!')
    }
    let sqlquery = `SELECT * FROM bookings WHERE user_id = ${decodedToken.user_id} ORDER BY from_date DESC`
    let { rows } = await db.query(sqlquery)
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/bookings/:booking_id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      throw new Error('Invalid authentication token!')
    }
    let { rows } = await db.query(
      `SELECT * FROM bookings WHERE booking_id = ${req.params.booking_id}`
    )
    if (rows[0].user_id !== decodedToken.user_id) {
      throw new Error('You are not authorized to see this booking!')
    }
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
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      throw new Error('Invalid authentication token!')
    }
    let { rowsSelect } = await db.query(
      `SELECT * FROM bookings WHERE booking_id = ${req.params.booking_id}`
    )
    if (!rows.length) {
      throw new Error(`No booking found with id ${req.params.booking_id}`)
    }
    if (rowsSelect[0].user_id !== decodedToken.user_id) {
      throw new Error('You are not authorized to delete this booking!')
    }
    let { rows } = await db.query(
      `DELETE FROM bookings WHERE booking_id = ${req.params.booking_id} RETURNING *`
    )
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
