import { Router } from 'express'
const router = Router()

router.get('/signup', (req, res) => {
  res.send('Hello from Signup')
})

router.get('/login', (req, res) => {
  res.send('Hello from Login')
})

router.get('/logout', (req, res) => {
  res.send('Hello from Logout')
})

export default router
