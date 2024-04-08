const express = require('express')
const router = express.Router()
const MaxWeights = require('../models/maxWeights')

// Getting all
router.get('/', async (req, res) => {
    try {
        const maxWeights = await MaxWeights.find()
        res.json(maxWeights)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const maxWeight = new MaxWeights({
            userID: req.body.userID,
            exerciseID: req.body.exerciseID,
            workoutID: req.body.workoutID,
            maxWeight: req.body.weight,
            weightUnit: req.body.weightUnit
        });

        const newMaxWeight = await maxWeight.save();
        res.status(201).json(newMaxWeight);
    } catch (err) {
        console.error('Error saving max weight:', err);
        res.status(400).json({ message: 'Failed to save max weight data', error: err.message });
    }
});

// Getting one from userID
router.get('/:userID/:exerciseID', getMaxWeightFromUserIDAndExerciseID, (req, res) => {
    res.json(res.maxWeight)
})

// Updating one with particular id
router.patch('/:id', getMaxWeight, async (req, res) => {
    if (req.body.maxWeight != null) {
        res.maxWeight.maxWeight = req.body.maxWeight
    }
    try {
        const updatedMaxWeight = await res.maxWeight.save()
        res.status(201).json(updatedMaxWeight)
    }
    catch (err)
    {
        res.status(400).json({ message: err.message })
    }    
})

async function getMaxWeight(req, res, next) {
    let maxWeight
    try {
        maxWeight = await MaxWeights.findById(req.params.id)
        if (maxWeight == null) {
            return res.status(404).json({ message: 'Cannot find set' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.maxWeight = maxWeight
    next()
}

async function getMaxWeightFromUserIDAndExerciseID(req, res, next) {
    let maxWeight
    try {
        console.log("params: ", req.params);
        maxWeight = await MaxWeights.find({ userID: req.params.userID, exerciseID: req.params.exerciseID })
        console.log("maxWeight: ", maxWeight);
        if (maxWeight == null) {
            return res.status(404).json({ message: 'No max weight for this users exercise' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.maxWeight = maxWeight
    next()
}

module.exports = router