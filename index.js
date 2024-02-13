import express from 'express'
const app = express()

import usersRoutes from './routes/usersRoutes.js'
import housesRoutes from './routes/housesRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'

app.use(usersRoutes)
app.use(housesRoutes)
app.use(reviewsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
