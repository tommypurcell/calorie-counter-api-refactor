import { Router } from 'express'
const router = Router()
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET

import User from '../models/users.js'

router.get('/users', async (req, res) => {
  try {
    // Use the decoded token's user ID to find the user
    let allUsers = await User.find({}) // Adjust according to how your token is structured
    console.log(allUsers)

    res.send(allUsers)
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})

router.get('/profile', async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).send('User not logged in')
    }

    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      return res.status(401).send('Invalid authentication token!')
    }

    // Use the decoded token's user ID to find the user
    let currentUser = await User.findById(decodedToken.user_id) // Adjust according to how your token is structured
    console.log(currentUser)

    if (!currentUser) {
      return res.status(404).send('User not found')
    }

    // Optionally, remove sensitive information before sending user details
    currentUser.password = undefined

    res.send(currentUser)
  } catch (err) {
    console.log(err)
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send('Invalid authentication token!')
    }
    res.status(500).send('Server error')
  }
})

//  Use router.patch /profile route to update the currently logged in user in the database Then respond with the updated user
router.patch('/profile', async (req, res) => {
  try {
    console.log('reqbody', req.body)

    // Check if the user is logged in
    if (!req.cookies.jwt) {
      return res.status(401).send('User not logged in')
    }

    // Verify authentication token
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret)
    if (!decodedToken) {
      return res.status(401).send('Invalid authentication token!')
    }

    // Use the decoded token's user ID to find the user
    let currentUser = await User.findById(decodedToken.user_id)
    if (!currentUser) {
      return res.status(404).send('User not found')
    }

    // Update the user's profile
    let updatedUser = await User.findByIdAndUpdate(
      decodedToken.user_id,
      req.body,
      {
        new: true
      }
    )

    if (!updatedUser) {
      return res.status(404).send('User not found')
    }

    console.log(updatedUser)

    // Send the updated user as response
    res.send(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error.message)
    res.status(500).send('Internal server error')
  }
})

// delete user
router.delete('/delete-user/:userId', async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.userId)
    if (userToDelete) {
      console.log(userToDelete, 'has been deleted')
      await User.findByIdAndDelete(userToDelete._id)
      res.json(`user ${userToDelete.name} has been deleted`)
    } else {
      throw new Error(
        'There is no user matching that Id. Nothing has been deleted.'
      )
    }
  } catch (err) {
    res.send(err.message)
  }
})

export default router
