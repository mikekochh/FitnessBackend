require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const exercisesRouter = require('./routes/exercises')
app.use('/exercises', exercisesRouter)

const workoutsRouter = require('./routes/workouts')
app.use('/workouts', workoutsRouter)

const setsRouter = require('./routes/sets')
app.use('/sets', setsRouter)

const maxWeightRouter = require('./routes/maxWeight')
app.use('/maxWeight', maxWeightRouter)

app.listen(3000, () => console.log("Server Started"))