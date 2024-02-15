import express from 'express'
const app = express()

import usersRoutes from './routes/usersRoutes.js'
import housesRoutes from './routes/housesRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'
import bookingsRoutes from './routes/bookingsRoutes.js'
import photosRoutes from './routes/photosRoutes.js'
import authRoutes from './routes/authRoutes.js'

app.use(express.json())

app.use(usersRoutes)
app.use(housesRoutes)
app.use(reviewsRoutes)
app.use(bookingsRoutes)
app.use(photosRoutes)
app.use(authRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
