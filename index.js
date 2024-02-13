import express from 'express'
const app = express()

import usersRoutes from './routes/usersRoutes.js'

app.use(usersRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
