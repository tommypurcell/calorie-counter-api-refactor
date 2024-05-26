import { Router } from 'express'
const router = Router()
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET

import Foods from '../models/foods.js'

// get all foods in database
router.get('/allfoods', async (req, res) => {
  try {
    let allFoods = await Foods.find({}).sort({
      date: 'desc',
      timestamp: 'desc'
    })
    res.send(allFoods)
  } catch (err) {
    res.send(err)
  }
})

// get /foods with user auth
router.get('/foods', async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).send('User not logged in')
    }

    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      return res.status(401).send('Invalid authentication token!')
    }
    console.log(decodedToken.user_id)
    let foods = await Foods.find({ userid: decodedToken.user_id }).sort({
      date: 'desc',
      timestamp: 'desc'
    })
    let groupedFoods = []
    let currentDay = null
    console.log(foods)
    foods.forEach((food) => {
      const date = food.date.toISOString().split('T')[0]

      if (date !== currentDay) {
        currentDay = date
        groupedFoods.push({
          date: currentDay,
          foods: [],
          totalCalories: 0
        })
      }

      groupedFoods[groupedFoods.length - 1].foods.push(food)
      groupedFoods[groupedFoods.length - 1].totalCalories += food.calories
    })

    res.send(groupedFoods)
  } catch (error) {
    console.error('Error fetching foods:', error)
    res.status(500).send('Internal server error')
  }
})

// add food for logged in user
router.post('/foods', async (req, res) => {
  if (!req.cookies.jwt) {
    return res.status(401).send('User not logged in')
  }

  const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
  if (!decodedToken) {
    return res.status(401).send('Invalid authentication token!')
  }

  console.log(decodedToken)
  // add userid to body
  req.body.userid = decodedToken.user_id
  console.log('body', req.body)
  let food = await Foods.create(req.body)
  console.log('food', food)
  res.send(food)
})

// update food item (normally just calorie value)
router.patch('/foods', async (req, res) => {
  console.log('body', req.body.id)
  const filter = { _id: req.body.id }
  const update = { calories: req.body.calories }
  let updatedUser = await Foods.findOneAndUpdate(filter, update, {
    new: true
  })
  console.log(updatedUser)
  res.send(updatedUser)
})

// delete food item
router.delete('/foods/:id', async (req, res) => {
  console.log('hello')
  console.log(req.params.id)

  await Foods.findByIdAndDelete(req.params.id)
  res.send('deleted')
})

export default router
