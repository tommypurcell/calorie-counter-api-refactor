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
    let sqlquery = `
      SELECT reviews.*, users.first_name, users.last_name, users.picture FROM reviews
      LEFT JOIN users ON users.user_id = reviews.user_id
    `
    if (req.query.house) {
      sqlquery += ` WHERE house_id = ${req.query.house}`
    }
    sqlquery += ' ORDER BY date DESC'
    let { rows } = await db.query(sqlquery)
    let reviews = rows.map((r) => {
      r.author = {
        firstName: r.first_name,
        lastName: r.last_name,
        picture: r.picture
      }
      delete r.first_name
      delete r.last_name
      delete r.picture
      return r
    })
    res.json(reviews)
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
    if (!rows.length) {
      throw new Error(`No reviews found with id ${req.params.review_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
