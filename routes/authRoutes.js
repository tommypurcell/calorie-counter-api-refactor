import { Router } from 'express'
const router = Router()
import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { jwtSecret } from '../secrets.js'

router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const { rows } = await db.query(`
      INSERT INTO users (first_name, last_name, email, password, picture)
      VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hashedPassword}', '${req.body.picture}')
      RETURNING *
    `)
    const user = rows[0]
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      jwtSecret
    )
    res.cookie('jwt', token)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM users WHERE email = '${req.body.email}'
    `)
    if (!rows.length) {
      throw new Error('User not found!')
    }
    const user = rows[0]
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (isPasswordValid) {
        const token = jwt.sign(
          { user_id: user.user_id, email: user.email },
          jwtSecret
        )
        res.cookie('jwt', token)
        res.send('Hello from Login')
      }
    }
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
