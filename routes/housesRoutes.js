import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.post('/houses', async (req, res) => {
  try {
    let { location, rooms, bathrooms, price, description, user_id } = req.body
    let { rows } = await db.query(`
      INSERT INTO houses (location, rooms, bathrooms, price, description, user_id)
      VALUES ('${location}', '${rooms}', '${bathrooms}', '${price}', '${description}', '${user_id}') 
      RETURNING *
    `)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/houses', async (req, res) => {
  try {
    // build query base
    let sqlquery = 'SELECT * FROM houses'
    let filters = []
    // add WHERE
    if (
      req.query.location ||
      req.query.max_price ||
      req.query.min_rooms ||
      req.query.search
    ) {
      sqlquery += ' WHERE '
    }
    // add filters
    if (req.query.location) {
      filters.push(`location = '${req.query.location}'`)
    }
    if (req.query.max_price) {
      filters.push(`price <= '${req.query.max_price}'`)
    }
    if (req.query.min_rooms) {
      filters.push(`rooms >= '${req.query.min_rooms}'`)
    }
    if (req.query.search) {
      filters.push(`description LIKE '%${req.query.search}%'`)
    }
    // array to string divided by AND
    sqlquery += filters.join(' AND ')
    // add ORDER BY
    if (req.query.sort) {
      sqlquery += ` ORDER BY ${req.query.sort} ${req.query.order || 'ASC'}`
    }
    // Run query
    let { rows } = await db.query(sqlquery)
    // Respond
    res.json(rows)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/houses/:house_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `SELECT * FROM houses WHERE house_id = ${req.params.house_id}`
    )
    if (!rows.length) {
      throw new Error(`No house found with id ${req.params.user_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
