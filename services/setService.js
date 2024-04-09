const Sets = require('../models/sets');

exports.getAllSets = async () => {
    return await Sets.find();
};

exports.getSetById = async (id) => {
    return await Sets.findById(id);
};

exports.createSet = async (setData) => {
    const set = new Sets(setData);
    return await set.save();
};

exports.updateSet = async (id, updateData) => {
    const set = await Sets.findById(id);
    if (updateData.workoutID != null) {
        set.workoutID = updateData.workoutID;
    }
    if (updateData.exerciseID != null) {
        set.exerciseID = updateData.exerciseID;
    }
    if (updateData.reps != null) {
        set.reps = updateData.reps;
    }
    if (updateData.weight != null) {
        set.weight = updateData.weight;
    }
    if (updateData.weightUnit != null) {
        set.weightUnit = updateData.weightUnit;
    }
    return await set.save();
};

exports.deleteSet = async (id) => {
    await Sets.findByIdAndDelete(id);
};

exports.getSetsByWorkoutID = async (workoutID) => {
    return await Sets.find({ workoutID });
};