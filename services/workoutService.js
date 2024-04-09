const Workouts = require('../models/workouts');

exports.getAllWorkouts = async () => {
    return await Workouts.find();
};

exports.getWorkoutInProgress = async (userID) => {
    return await Workouts.findOne({ userID, inProgress: true });
};

exports.getWorkoutById = async (id) => {
    return await Workouts.findById(id);
};

exports.createWorkout = async (workoutData) => {
    const workout = new Workouts(workoutData);
    return await workout.save();
};

exports.completeWorkout = async (id) => {
    const workout = await Workouts.findById(id);
    workout.inProgress = false;
    return await workout.save();
};

exports.updateWorkout = async (id, updateData) => {
    const workout = await Workouts.findById(id);
    if (updateData.date != null) {
        workout.date = updateData.date;
    }
    if (updateData.duration != null) {
        workout.duration = updateData.duration;
    }
    return await workout.save();
};

exports.deleteWorkout = async (id) => {
    await Workouts.findByIdAndDelete(id);
};