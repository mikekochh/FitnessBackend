const exerciseService = require('../services/exerciseService');

exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getExerciseById = async (req, res) => {
    try {
        const exercise = await exerciseService.getExerciseById(req.params.id);
        if (exercise === null) {
            return res.status(404).json({ message: 'Cannot find exercise' });
        }
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createExercise = async (req, res) => {
    try {
        console.log("We are creating a new exercise here");
        const newExercise = await exerciseService.createExercise(req.body);
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateExercise = async (req, res) => {
    try {
        const updatedExercise = await exerciseService.updateExercise(req.params.id, req.body);
        if (updatedExercise === null) {
            return res.status(404).json({ message: 'Cannot find exercise' });
        }
        res.status(201).json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteExercise = async (req, res) => {
    try {
        await exerciseService.deleteExercise(req.params.id);
        res.json({ message: "Deleted Exercise" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};