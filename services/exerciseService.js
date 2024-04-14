const Exercises = require('../models/exercises');

exports.getAllExercises = async () => {
    return await Exercises.find();
};

exports.getExerciseById = async (id) => {
    return await Exercises.findById(id);
};

exports.createExercise = async (exerciseData) => {
    const exercise = new Exercises(exerciseData);
    return await exercise.save();
};

exports.updateExercise = async (id, updateData) => {
    const exercise = await Exercises.findById(id);

    if (exercise === null) {
        return null;
    }

    if (updateData.name != null) {
        exercise.name = updateData.name;
    }
    if (updateData.userID != null) {
        exercise.userID = updateData.userID;
    }
    if (updateData.primaryMuscleGroup != null) {
        exercise.primaryMuscleGroup = updateData.primaryMuscleGroup;
    }
    if (updateData.secondaryMuscleGroup != null) {
        exercise.secondaryMuscleGroup = updateData.secondaryMuscleGroup;
    }
    if (updateData.isBodyweight != null) {
        exercise.isBodyweight = updateData.isBodyweight;
    }

    return await exercise.save();
};

exports.deleteExercise = async (id) => {
    await Exercises.findByIdAndDelete(id);
};