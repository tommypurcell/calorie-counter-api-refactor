import { Router } from 'express'
const router = Router()

router.get('/houses', (req, res) => {
  res.json([
    { id: 1, location: 'Bali' },
    { id: 2, location: 'Koh Phangan' }
  ])
})

router.get('/houses/1', (req, res) => {
  res.json({ id: 1, location: 'Bali' })
})

export default router
