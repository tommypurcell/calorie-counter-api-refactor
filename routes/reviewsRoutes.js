import { Router } from 'express'
const router = Router()
import db from '../db.js'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../secrets.js'

router.post('/reviews', async (req, res) => {
  try {
    // Validate Token
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken || !decodedToken.user_id || !decodedToken.email) {
      throw new Error('Invalid authentication token')
    }
    // Validate fields
    let { house_id, content, rating } = req.body
    if (!house_id || !content || !rating) {
      throw new Error('house_id, content, and rating are required')
    }
    // Validate rating
    if (rating < 0 || rating > 5) {
      throw new Error('rating must be between 0 and 5')
    }
    // Get current date
    let date = new Date()
    date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    let { rows } = await db.query(`
      INSERT INTO reviews (house_id, user_id, date, content, rating)
      VALUES (${house_id}, ${decodedToken.user_id}, '${date}', '${content}', ${rating})
      RETURNING *
    `)
    let review = rows[0]
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
    const formatted = formatter.format(new Date(review.date))
    review.date = formatted
    res.json(review)
    // Update house
    let houseUpdated = await db.query(
      `UPDATE houses SET reviews = reviews + 1, rating = ((rating + ${rating}) / (reviews + 1)) WHERE house_id = ${house_id} RETURNING *`
    )
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

// Route not in use
// router.get('/reviews/:review_id', async (req, res) => {
//   try {
//     let { rows } = await db.query(
//       `SELECT * FROM reviews WHERE review_id = ${req.params.review_id}`
//     )
//     if (!rows.length) {
//       throw new Error(`No review found with id ${req.params.user_id}`)
//     }
//     res.json(rows[0])
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

// Route not in use
// router.delete('/reviews/:review_id', async (req, res) => {
//   try {
//     let { rows } = await db.query(
//       `DELETE FROM reviews WHERE review_id = ${req.params.review_id} RETURNING *`
//     )
//     if (!rows.length) {
//       throw new Error(`No reviews found with id ${req.params.review_id}`)
//     }
//     res.json(rows[0])
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

export default router
