import express from "express"
import morgan from "morgan"
import colors from "colors"
import dotenv from "dotenv"
import path from "path"
// CONFIG
import connectDB from "./config/db.js"
// Middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
// ROUTES
import userRoutes from "./routes/userRoutes.js"
import exerciseRoutes from "./routes/exerciseRoutes.js"
import workoutRoutes from "./routes/workoutRoutes.js"

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development')
  app.use(morgan('dev'))

app.use(express.json())

const _dirName = path.resolve();
app.use('/uploads', express.static(path.join(_dirName, '/uploads/')))

app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/workouts', workoutRoutes)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 5000

app.listen(
  PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}` .yellow.bold)
)
