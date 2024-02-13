import { Router } from 'express'
const router = Router()

router.get('/bookings', (req, res) => {
  res.json([
    { id: 1, message: 'Hello' },
    { id: 2, message: 'Hi' }
  ])
})

router.get('/bookings/1', (req, res) => {
  res.json({ id: 1, message: 'Hello' })
})

export default router
