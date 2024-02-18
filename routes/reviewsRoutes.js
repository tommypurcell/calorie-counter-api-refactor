import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.post('/reviews', async (req, res) => {
  try {
    let { house_id, user_id, date, comment, rating } = req.body
    let { rows } = await db.query(`
      INSERT INTO reviews (house_id, user_id, date, comment, rating)
      VALUES ('${house_id}', '${user_id}', '${date}', '${comment}', '${rating}')
      RETURNING *
    `)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

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

router.get('/reviews/:review_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `SELECT * FROM reviews WHERE review_id = ${req.params.review_id}`
    )
    if (!rows.length) {
      throw new Error(`No review found with id ${req.params.user_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.delete('/reviews/:review_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `DELETE FROM reviews WHERE review_id = ${req.params.review_id} RETURNING *`
    )
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
