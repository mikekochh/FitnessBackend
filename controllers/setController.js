const setService = require('../services/setService');

exports.getAllSets = async (req, res) => {
    try {
        const sets = await setService.getAllSets();
        res.json(sets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSetById = async (req, res) => {
    try {
        const set = await setService.getSetById(req.params.id);
        if (set === null) {
            return res.status(404).json({ message: 'Cannot find set' });
        }
        res.json(set);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSet = async (req, res) => {
    try {
        const newSet = await setService.createSet(req.body);
        res.status(201).json(newSet);
    } catch (err) {
        console.error('Error saving set:', err);
        res.status(400).json({ message: 'Failed to save set data', error: err.message });
    }
};

exports.updateSet = async (req, res) => {
    try {
        const updatedSet = await setService.updateSet(req.params.id, req.body);
        res.status(201).json(updatedSet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSet = async (req, res) => {
    try {
        await setService.deleteSet(req.params.id);
        res.json({ message: "Deleted Set" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSetsByWorkoutID = async (req, res) => {
    try {
        const sets = await setService.getSetsByWorkoutID(req.params.workoutID);
        if (sets === null) {
            return res.status(404).json({ message: 'Cannot find sets for workout' });
        }
        const setsArray = sets.map(set => ({
            workoutID: set.workoutID,
            exerciseID: set.exerciseID,
            reps: set.reps,
            weight: set.weight,
            weightUnit: set.weightUnit
        }));
        res.json(setsArray);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};