import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.post('/signup', async (req, res) => {
  try {
    const { rows } = await db.query(`
      INSERT INTO users (first_name, last_name, email, password, picture)
      VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}', '${req.body.picture}')
      RETURNING *
    `)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    res.send('Hello from Login')
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/logout', (req, res) => {
  try {
    res.send('Hello from Logout')
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
