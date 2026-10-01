import mongoose from 'mongoose'

const preferenceSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, unique: true, match: /^[\da-f-]{36}$/i },
    length: { type: Number, min: 8, max: 32, default: 16 },
    uppercase: { type: Boolean, default: true },
    lowercase: { type: Boolean, default: true },
    numbers: { type: Boolean, default: true },
    symbols: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
)

export default mongoose.model('Preference', preferenceSchema)
