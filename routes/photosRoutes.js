import { Router } from 'express'
const router = Router()

router.get('/photos', (req, res) => {
  res.json([
    { id: 1, url: 'url1' },
    { id: 2, url: 'url2' }
  ])
})

router.get('/photos/1', (req, res) => {
  res.json({ id: 1, url: 'url1' })
})

export default router
