const workoutService = require('../services/workoutService');
const userMaxWeightService = require('../services/userMaxWeightService');
const userPRService = require('../services/userPRService');

exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWorkoutInProgress = async (req, res) => {
    try {
        const workoutInProgress = await workoutService.getWorkoutInProgress(req.params.userID);
        if (workoutInProgress === null) {
            return res.status(404).json({ message: 'No workout in progress' });
        }
        return res.json(workoutInProgress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await workoutService.getWorkoutById(req.params.id);
        if (workout === null) {
            return res.status(404).json({ message: 'Cannot find workout' });
        }
        res.json(workout);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createWorkout = async (req, res) => {
    try {
        const newWorkout = await workoutService.createWorkout(req.body);
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.completeWorkout = async (req, res) => {
    try {
        const updatedWorkout = await workoutService.completeWorkout(req.params.id);
        const updatedUserMaxWeight = await userMaxWeightService.checkAndUpdateMaxWeight(req.params.id, updatedWorkout.userID);
        const updateUserPR = await userPRService.checkAndUpdatePR(req.params.id, updatedWorkout.userID);
        res.status(201).json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await workoutService.updateWorkout(req.params.id, req.body);
        res.status(201).json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        await workoutService.deleteWorkout(req.params.id);
        res.json({ message: "Deleted Workout" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};