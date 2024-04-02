const express = require('express')
const router = express.Router()
const Workouts = require('../models/workouts')

// Getting all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workouts.find()
        res.json(workouts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one workout
router.get('/:id', getWorkout, (req, res) => {
    res.json(res.workout)
})

// Creating one workout
router.post('/', async (req, res) => {
    const workout = new Workouts({
        userID: req.body.userID,
        date: req.body.date,
        duration: req.body.duration
    })

    try {
        const newWorkout = await workout.save()
        res.status(201).json(newWorkout)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one workout
router.patch('/:id', getWorkout, async (req, res) => {
    if (req.body.date != null) {
        res.workout.date = req.body.date
    }
    if (req.body.duration != null) {
        res.workout.duration = req.body.duration
    }
    try {
        const updatedWorkout = await res.workout.save()
        res.status(201).json(updatedWorkout)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one workout
router.delete('/:id', getWorkout, async (req, res) => {
    try {
        await res.workout.deleteOne()
        res.json({ message: "Deleted Workout" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getWorkout(req, res, next) {
    let workout
    try {
        workout = await Workouts.findById(req.params.id)
        if (workout == null) {
            return res.status(404).json({ message: 'Cannot find workout' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.workout = workout
    next()
}

module.exports = router