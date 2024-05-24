import mongoose from 'mongoose'

// Corrected schema definition without 'users' as the first argument
// If you want to specify a custom collection name, use the second argument as an options object
const userSchema = new mongoose.Schema(
  {
    avatar: String, // This field is duplicated; consider keeping only one
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    calorieGoal: {
      type: Number
    }
    // Removed the duplicated avatar field
  },
  { collection: 'users' }
) // Optional: Specify a custom collection name here

const User = mongoose.model('User', userSchema)

export default User
