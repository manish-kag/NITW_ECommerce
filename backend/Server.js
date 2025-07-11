import 'dotenv/config' 
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import newsletterRoute from './routes/newsletterRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
app.use(express.json()) 
app.use(cors({
    origin: 'https://internitshop.vercel.app',
    credentials: true
}))

// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/newsletter', newsletterRoute)

app.get('/', (req, res) => {
    res.send("API working")
})

export default app;
