import { Router } from 'express'
const router = Router()
import db from '../db.js'

// Route not in use
// router.post('/photos', async (req, res) => {
//   try {
//     const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
//     if (!decodedToken) {
//       throw new Error('Invalid authentication token')
//     }
//     const house = await db.query(`
//       SELECT * FROM houses WHERE house_id = ${req.body.house}
//     `)
//     if (house.rows[0].user_id !== decodedToken.user_id) {
//       throw new Error('You are not authorized to add photos for this house')
//     }
//     let { rows } = await db.query(`
//       INSERT INTO houses_photos (house_id, photo)
//       VALUES ('${req.body.house}', '${req.body.photo}')
//       RETURNING *
//     `)
//     res.json(rows[0])
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

// Route not in use
// router.get('/photos', async (req, res) => {
//   try {
//     if (!req.query.house) {
//       res.json({ error: 'house parameter is required' })
//     } else {
//       let { rows } = await db.query(
//         `SELECT * FROM houses_photos WHERE house_id = ${req.query.house}`
//       )
//       res.json(rows)
//     }
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

// Route not in use
// router.get('/photos/:photo_id', async (req, res) => {
//   try {
//     let { rows } = await db.query(
//       `SELECT * FROM houses_photos WHERE id = ${req.params.photo_id}`
//     )
//     if (!rows.length) {
//       throw new Error(`No photo found with id ${req.params.user_id}`)
//     }
//     res.json(rows[0])
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

// Route not in use
// router.patch('/photos/:photo_id', async (req, res) => {
//   try {
//     const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
//     if (!decodedToken) {
//       throw new Error('Invalid authentication token')
//     }
//     const { photosRows } = await db.query(`
//       SELECT * FROM photos WHERE id = ${req.params.photo_id}
//       LEFT JOIN houses ON houses.house_id = photos.house_id
//     `)
//     if (photosRows.rows[0].user_id !== decodedToken.user_id) {
//       throw new Error('You are not authorized to updated photos for this house')
//     }
//     let { house_id, photo, featured } = req.body
//     // Start building the SQL query
//     let sqlquery = `UPDATE houses_photos `
//     // Add SET if the req.body object is not empty
//     if (req.body) {
//       sqlquery += `SET `
//     }
//     // Iterate over the keys of the req.body object and add each key-value pair to the SQL query
//     for (let key in req.body) {
//       sqlquery += `${key} = '${req.body[key]}', `
//     }
//     // Remove the trailing comma and space from the SQL query
//     sqlquery = sqlquery.slice(0, -2)
//     // Add the WHERE clause to the SQL query
//     sqlquery += ` WHERE id = ${req.params.photo_id} RETURNING *`
//     // Execute the SQL query
//     let { rows } = await db.query(sqlquery)
//     // Send the response
//     res.json(rows[0])
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

// Route not in use
// router.delete('/photos/:photo_id', async (req, res) => {
//   try {
//     const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
//     if (!decodedToken) {
//       throw new Error('Invalid authentication token')
//     }
//     const { photosRows } = await db.query(`
//       SELECT * FROM photos WHERE id = ${req.params.photo_id}
//       LEFT JOIN houses ON houses.house_id = photos.house_id
//     `)
//     if (photosRows.rows[0].user_id !== decodedToken.user_id) {
//       throw new Error('You are not authorized to delete photos for this house')
//     }
//     let { rows } = await db.query(
//       `DELETE FROM houses_photos WHERE id = ${req.params.photo_id} RETURNING *`
//     )
//     if (!rows.length) {
//       throw new Error(`No photo found with id ${req.params.photo_id}`)
//     }
//     res.json(rows[0])
//   } catch (err) {
//     res.json({ error: err.message })
//   }
// })

export default router
