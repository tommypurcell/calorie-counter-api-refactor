import mongoose from 'mongoose'

// Corrected schema definition without 'users' as the first argument
// If you want to specify a custom collection name, use the second argument as an options object
const foodSchema = new mongoose.Schema(
  {
    avatar: String, // This field is duplicated; consider keeping only one
    name: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    timestamp: {
      type: Date
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId
    }
    // Removed the duplicated avatar field
  },
  { collection: 'foods' }
) // Optional: Specify a custom collection name here

const Foods = mongoose.model('Foods', foodSchema)

export default Foods
