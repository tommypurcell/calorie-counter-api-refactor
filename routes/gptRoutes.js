import { Router } from 'express'
import OpenAI from 'openai'

const router = Router()

// Initialize OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

// Endpoint to fetch nutrition data using GPT
router.post('/gpt-nutrition', async (req, res) => {
  const { foodItem } = req.body

  if (!foodItem) {
    return res.status(400).json({ error: 'Food item is required' })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.'
        },
        {
          role: 'user',
          content: `Provide the nutrition facts for the following items: ${foodItem}. Output the information as JSON. The JSON should contain an array named "entries" with food, calories, totalFat, totalCarbohydrates, and protein.`
        }
      ]
    })

    const nutritionData = completion.choices[0].message.content.trim()
    console.log('nutrition data:', nutritionData)
    res.json(JSON.parse(nutritionData))
  } catch (error) {
    console.error(
      'Error fetching nutrition data:',
      error.response ? error.response.data : error.message
    )
    res.status(500).json({ error: 'Failed to fetch nutrition data' })
  }
})

export default router
