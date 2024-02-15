import { Router } from 'express'
const router = Router()

router.get('/signup', (req, res) => {
  try {
    res.send('Hello from Signup')
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/login', (req, res) => {
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
