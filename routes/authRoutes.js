import { Router } from 'express'
const router = Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET

import User from '../models/users.js'

// POST /login
router.post('/login', async (req, res) => {
  try {
    // Find user that matches email
    let userFound = await User.findOne({
      email: req.body.email
    })

    if (!userFound) {
      // User not found
      console.log('Cannot login: User does not exist. Please sign up instead.')
      return res
        .status(404)
        .send('Cannot login: User does not exist. Please sign up instead.')
    } else {
      // Compare password with hashed password in the database
      console.log(userFound)
      console.log(req.body)
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userFound.password
      )

      if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign(
          {
            user_id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            avatar: userFound.avatar
          },
          jwtSecret
        )

        // Set token in a HTTP Only Cookie
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })

        res.json({
          token,
          user: {
            email: userFound.email,
            avatar: userFound.avatar,
            name: userFound.name
          }
        })
      } else {
        // Invalid password
        return res.status(401).send('Invalid password. Please try again.')
      }
    }
  } catch (err) {
    console.error('Login error', err)
    res.status(500).send('An error occurred during the login process.')
  }
})

// POST /signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      console.log('User with this email already exists')
      return res.json('User with this email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    console.log('User signed up:', newUser)
    res.status(201).send(newUser)
  } catch (err) {
    res.send(err)
  }
})

// GET /logout
router.get('/logout', (req, res) => {
  try {
    res.clearCookie('jwt')
    res.send('You are logged out')
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
