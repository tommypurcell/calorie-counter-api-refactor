import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.post('/photos', async (req, res) => {
  try {
    let { house, photo } = req.body
    let { rows } = await db.query(`
      INSERT INTO houses_photos (house_id, photo)
      VALUES ('${house}', '${photo}')
      RETURNING *
    `)
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/photos', async (req, res) => {
  try {
    if (!req.query.house) {
      res.json({ error: 'house parameter is required' })
    } else {
      let { rows } = await db.query(
        `SELECT * FROM houses_photos WHERE house_id = ${req.query.house}`
      )
      res.json(rows)
    }
  } catch (err) {
    res.json({ error: err.message })
  }
})

router.get('/photos/:photo_id', async (req, res) => {
  try {
    let { rows } = await db.query(
      `SELECT * FROM houses_photos WHERE id = ${req.params.photo_id}`
    )
    if (!rows.length) {
      throw new Error(`No photo found with id ${req.params.user_id}`)
    }
    res.json(rows[0])
  } catch (err) {
    res.json({ error: err.message })
  }
})

export default router
