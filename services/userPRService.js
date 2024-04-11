const UserPRs = require('../models/userPRs');
const Sets = require('../models/sets')

async function getAllPRs() {
    return await UserPRs.find();
}

async function getPRFromUserIDAndExerciseID(userID, exerciseID) {
    return await UserPRs.find({ userID, exerciseID });
}

async function checkAndUpdatePR(workoutID, userID) {
    try {
        const workoutSets = await Sets.find({ workoutID });

        for (const set of workoutSets) {
            const existingPR = await UserPRs.findOne({ userID, exerciseID: set.exerciseID });
          
            if (!existingPR) {
                const highestWeightSet = workoutSets.reduce((maxSet, currentSet) => {
                    if (currentSet.exerciseID === set.exerciseID && currentSet.weight > maxSet.weight) {
                        return currentSet;
                    }
                    return maxSet;
                }, set);

                const newPR = new UserPRs({
                    userID,
                    exerciseID: highestWeightSet.exerciseID,
                    workoutID: highestWeightSet.workoutID,
                    weight: highestWeightSet.weight,
                    weightUnit: highestWeightSet.weightUnit
                });
                await newPR.save();
            } 
            else {
                if (set.weight > existingPR.weight) {
                    existingPR.weight = set.weight;
                    existingPR.weightUnit = set.weightUnit;
                    existingPR.workoutID = set.workoutID;
                    await existingPR.save();
                }
            }
          }
    } catch (err) {
        console.error('Error updating PR:', err);
    }
};

module.exports = {
    getAllPRs,
    getPRFromUserIDAndExerciseID,
    checkAndUpdatePR
};