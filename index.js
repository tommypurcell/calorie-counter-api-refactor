import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
const app = express()
import mongoose from 'mongoose'

// env variables
const DB_URL = process.env.DB_URL

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

import authRoutes from './routes/authRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import userRoutes from './routes/userRoutes.js'

app.use(authRoutes)
app.use(foodRoutes)
app.use(userRoutes)

// Database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(process.env.PORT || 4100, () => {
  console.log(`Airbnb API ready on ${process.env.PORT || 4100}`)
})
