import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/photos', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM houses_photos')
  res.json(rows)
})

router.get('/photos/1', async (req, res) => {
  let { rows } = await db.query('SELECT * FROM houses_photos')
  res.json(rows[0])
})

export default router
