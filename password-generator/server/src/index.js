import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import Preference from './models/Preference.js'

const app = express()
const port = Number(process.env.PORT) || 5000
const preferenceFields = ['length', 'uppercase', 'lowercase', 'numbers', 'symbols']

app.disable('x-powered-by')
app.use(express.json({ limit: '2kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/preferences/:clientId', async (request, response, next) => {
  try {
    const preference = await Preference.findOne({ clientId: request.params.clientId }).lean()
    if (!preference) return response.json({})

    const { length, uppercase, lowercase, numbers, symbols } = preference
    return response.json({ length, uppercase, lowercase, numbers, symbols })
  } catch (error) {
    return next(error)
  }
})

app.put('/api/preferences/:clientId', async (request, response, next) => {
  const { clientId } = request.params
  const settings = request.body

  if (!/^[\da-f-]{36}$/i.test(clientId)) {
    return response.status(400).json({ error: 'Invalid client identifier.' })
  }
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
    return response.status(400).json({ error: 'Preferences must be a JSON object.' })
  }
  if (preferenceFields.some((key) => !(key in settings))) {
    return response.status(400).json({ error: 'All preference fields are required.' })
  }
  if (Object.keys(settings).some((key) => !preferenceFields.includes(key))) {
    return response.status(400).json({ error: 'Unexpected preference field.' })
  }
  if ('length' in settings && (!Number.isInteger(settings.length) || settings.length < 8 || settings.length > 32)) {
    return response.status(400).json({ error: 'Length must be between 8 and 32.' })
  }
  if (preferenceFields.slice(1).some((key) => key in settings && typeof settings[key] !== 'boolean')) {
    return response.status(400).json({ error: 'Character options must be true or false.' })
  }
  if (preferenceFields.slice(1).every((key) => settings[key] === false)) {
    return response.status(400).json({ error: 'At least one character type must be enabled.' })
  }

  try {
    const preference = await Preference.findOneAndUpdate(
      { clientId },
      { $set: settings, $setOnInsert: { clientId } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    ).lean()
    const { length, uppercase, lowercase, numbers, symbols } = preference
    return response.json({ length, uppercase, lowercase, numbers, symbols })
  } catch (error) {
    return next(error)
  }
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'The request could not be completed.' })
})

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required. Copy server/.env.example to server/.env and configure it.')
  }

  await mongoose.connect(process.env.MONGODB_URI)
  app.listen(port, () => {
    console.log(`Keycraft API listening on http://localhost:${port}`)
  })
}

start().catch((error) => {
  console.error('Could not start Keycraft API:', error.message)
  process.exitCode = 1
})
