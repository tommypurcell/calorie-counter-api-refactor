import { Router } from 'express'
const router = Router()

router.get('/reviews', (req, res) => {
  res.json([
    { id: 1, rating: 5 },
    { id: 2, rating: 3 }
  ])
})

router.get('/reviews/1', (req, res) => {
  res.json({ id: 1, rating: 5 })
})

export default router
