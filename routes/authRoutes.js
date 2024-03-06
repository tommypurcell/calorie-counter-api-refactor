import { Router } from 'express'
const router = Router()
import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWTSECRET

router.post('/signup', async (req, res) => {
  try {
    // Required fields
    if (!req.body.email) {
      throw new Error('email is required')
    }
    if (!req.body.password) {
      throw new Error('password is required')
    }
    if (!req.body.picture) {
      throw new Error('picture is required')
    }
    if (!req.body.first_name) {
      throw new Error('first_name is required')
    }
    if (!req.body.last_name) {
      throw new Error('last_name is required')
    }
    // Other validation
    if (req.body.password.length < 6) {
      throw new Error('password must be minimum 6 characters long')
    }
    // Check duplicate user by email
    const userExists = await db.query(`
      SELECT * FROM users WHERE email = '${req.body.email}'
    `)
    if (userExists.rows.length) {
      throw new Error('User with this email already exists!')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // Save user
    const { rows } = await db.query(`
      INSERT INTO users (first_name, last_name, email, password, picture)
      VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hashedPassword}', '${req.body.picture}')
      RETURNING *
    `)
    let user = rows[0]
    // Create token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      jwtSecret
    )
    res.cookie('jwt', token)
    // Compose response
    delete user.password
    // Respond
    res.json(user)
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    // Required fields
    if (!req.body.email) {
      throw new Error('email is required')
    }
    if (!req.body.password) {
      throw new Error('password is required')
    }
    // Find user
    const { rows } = await db.query(`
      SELECT * FROM users WHERE email = '${req.body.email}'
    `)
    if (!rows.length) {
      throw new Error('Either your email or your password is incorrect')
    }
    const user = rows[0]
    // Validate password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) {
      throw new Error('Either your email or your password is incorrect')
    }
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      jwtSecret
    )
    // Compose response
    res.cookie('jwt', token)
    // Respond
    res.json({ message: 'You are logged in' })
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('jwt')
    res.json({ message: 'You are logged out' })
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
