const express = require('express')
const router = express.Router()
const Sets = require('../models/sets')

// Getting all
router.get('/', async (req, res) => {
    try {
        const sets = await Sets.find()
        res.json(sets)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getSet, (req, res) => {
    res.json(res.set)
})

router.post('/', async (req, res) => {
    console.log("Received request:", req.body);

    try {
        const set = new Sets({
            workoutID: req.body.workoutID,
            exerciseID: req.body.exerciseID,
            reps: req.body.reps,
            weight: req.body.weight,
            weightUnit: req.body.weightUnit
        });


        const newSet = await set.save();
        res.status(201).json(newSet);
    } catch (err) {
        console.error('Error saving set:', err);
        res.status(400).json({ message: 'Failed to save set data', error: err.message });
    }
});

// Updating One
router.patch('/:id', getSet, async (req, res) => {
    if (req.body.workoutID != null) {
        res.set.workoutID = req.body.workoutID
    }
    if (req.body.exerciseID != null) {
        res.set.exerciseID = req.body.exerciseID
    }
    if (req.body.reps != null) {
        res.set.reps = req.body.reps
    }
    if (req.body.weight != null) {
        res.set.weight = req.body.weight
    }
    if (req.body.weightUnit != null) {
        res.set.weightUnit = req.body.weightUnit
    }
    try {
        const updatedSet = await res.set.save()
        res.status(201).json(updatedSet)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getSet, async (req, res) => {
    try {
        await res.set.deleteOne()
        res.json({ message: "Deleted Set" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSet(req, res, next) {
    let set
    try {
        set = await Sets.findById(req.params.id)
        if (set == null) {
            return res.status(404).json({ message: 'Cannot find set' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.set = set
    next()
}

// Getting All Sets based off workoutID
router.get('/workoutID/:workoutID', getSetsByWorkoutID, (req, res) => {
    const setsArray = res.sets.map(set => ({
        workoutID: set.workoutID,
        exerciseID: set.exerciseID,
        reps: set.reps,
        weight: set.weight,
        weightUnit: set.weightUnit
    }));
    
    res.json(setsArray);
});

async function getSetsByWorkoutID(req, res, next) {
    let sets
    try {
        sets = await Sets.find({ workoutID: req.params.workoutID });
        if (sets == null) {
            return res.status(404).json({ message: 'Cannot find sets for workout' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.sets = sets
    next()
}

module.exports = router