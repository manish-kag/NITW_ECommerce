import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB')
        })
        console.log('MongoDB URI:', process.env.MONGODB_URI) // Add this line
        await mongoose.connect(`${process.env.MONGODB_URI}/internitshop`)
    } catch (err) {
        console.error('MongoDB connection error:', err)
    }
}

export default connectDB;