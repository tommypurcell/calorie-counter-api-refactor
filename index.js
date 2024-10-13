import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()

// Environment variables
const DB_URL = process.env.DB_URL

// Apply CORS middleware to allow all origins
app.use(cors({ origin: true, credentials: true }))

// Handle preflight requests (optional)
app.options('*', cors())

// Middleware
app.use(express.json())
app.use(cookieParser())

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`)
  next()
})

// Import routes
import gptRoutes from './routes/gptRoutes.js'
import authRoutes from './routes/authRoutes.js'
import foodRoutes from './routes/foodRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Use routes
app.use(gptRoutes)
app.use(authRoutes)
app.use(foodRoutes)
app.use(userRoutes)

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).send('Route not found')
})

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(500).send('Internal Server Error')
})

// Connect to the database
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Start server
const PORT = process.env.PORT || 4100
app.listen(PORT, () => {
  console.log(`Calorie Counter API ready on port ${PORT}`)
})
