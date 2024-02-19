import { Router } from 'express'
const router = Router()
import db from '../db.js'
import jwt from 'jsonwebtoken'

router.get('/users', async (req, res) => {
  try {
    let { rows } = await db.query('SELECT * FROM users')
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})
import { jwtSecret } from '../secrets.js'

router.get('/users/:user_id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      throw new Error('Invalid authentication token!')
    }
    if (decodedToken.user_id !== parseInt(req.params.user_id)) {
      throw new Error('You are not authorized to view this user!')
    }
    let { rows } = await db.query(
      `SELECT * FROM users WHERE user_id = ${req.params.user_id}`
    )
    if (!rows.length) {
      throw new Error(`No user found with id ${req.params.user_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.patch('/users/:user_id', async (req, res) => {
  try {
    let { first_name, last_name, email, password, picture } = req.body
    // Start building the SQL query
    let sqlquery = `UPDATE users `
    // Add SET if the req.body object is not empty
    if (req.body) {
      sqlquery += `SET `
    }
    // Iterate over the keys of the req.body object and add each key-value pair to the SQL query
    for (let key in req.body) {
      sqlquery += `${key} = '${req.body[key]}', `
    }
    // Remove the trailing comma and space from the SQL query
    sqlquery = sqlquery.slice(0, -2)
    // Add the WHERE clause to the SQL query
    sqlquery += ` WHERE user_id = ${req.params.user_id} RETURNING *`
    // Execute the SQL query
    let { rows } = await db.query(sqlquery)
    // Send the response
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
