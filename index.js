import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()

// env variables
const DB_URL = process.env.DB_URL

// Set up CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use your frontend domain or localhost for dev
  credentials: true // Allow cookies and other credentials
}

// Apply CORS middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

import gptRoutes from './routes/gptRoutes.js'
import authRoutes from './routes/authRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import userRoutes from './routes/userRoutes.js'

app.use(gptRoutes)
app.use(authRoutes)
app.use(foodRoutes)
app.use(userRoutes)

// Database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Start server
app.listen(process.env.PORT || 4100, () => {
  console.log(`Calorie Counter API ready on ${process.env.PORT || 4100}`)
})
