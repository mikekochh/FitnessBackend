const express = require('express')
const router = express.Router()
const Exercises = require('../models/exercises')

// Getting all
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercises.find()
        res.json(exercises)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getExercises, (req, res) => {
    res.json(res.exercises)
})

// Creating One
router.post('/', async (req, res) => {
    const exercises = new Exercises({
        name: req.body.name,
        userID: req.body.userID,
        primaryMuscleGroup: req.body.primaryMuscleGroup,
        secondaryMuscleGroup: req.body.secondaryMuscleGroup
    })

    try {
        const newExercises = await exercises.save()
        res.status(201).json(newExercises)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getExercises, async (req, res) => {
    if (req.body.name != null) {
        res.exercises.name = req.body.name
    }
    if (req.body.userID != null) {
        res.exercises.userID = req.body.userID
    }
    if (req.body.primaryMuscleGroup != null) {
        res.exercises.primaryMuscleGroup = req.body.primaryMuscleGroup
    }
    if (req.body.secondaryMuscleGroup != null) {
        res.exercises.secondaryMuscleGroup = req.body.secondaryMuscleGroup
    }
    try {
        const updatedExercises = await res.exercises.save()
        res.status(201).json(updatedExercises)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getExercises, async (req, res) => {
    try {
        await res.exercises.deleteOne()
        res.json({ message: "Deleted Exercise" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getExercises(req, res, next) {
    let exercises
    try {
        exercises = await Exercises.findById(req.params.id)
        if (exercises == null) {
            return res.status(404).json({ message: 'Cannot find exercises' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.exercises = exercises
    next()
}

module.exports = router