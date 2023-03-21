// Print message to console
console.log('iShop E-Commerce Backend')

// Import dependencies
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import menuApi from './routes/menu-api'
import adminApi from './routes/admin-api'

// Create Express app instance and set port number and MongoDB connection string
const app = express()
const PORT = 8080
const MONGODB_CONNECTION_STRING =
  'mongodb+srv://MongoTuru:*****@turumongo.pfftwk3.mongodb.net/test'

// Middleware functions
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(express.json()) // Parse incoming JSON payloads
app.use('/menu', menuApi) // Handle /menu API routes
app.use('/admin', adminApi) // Handle /admin API routes

// Start server and connect to MongoDB database
app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING) // Connect to MongoDB database
    .then(console.log('Database successfully connected')) // Log successful connection
    .catch((error) => console.error(error)) // Log error if connection fails

  console.log(
    `iSHop E-Commerce application is running on http://localhost:${PORT}`
  ) // Log message indicating server is running and accessible at specified URL
})
