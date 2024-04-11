const UserMaxWeights = require('../models/userMaxWeights');
const Sets = require('../models/sets')

async function getAllMaxWeights() {
    return await UserMaxWeights.find();
}

async function getMaxWeightFromUserIDAndExerciseID(userID, exerciseID) {
    return await UserMaxWeights.find({ userID, exerciseID });
}

async function checkAndUpdateMaxWeight(workoutID, userID) {
    try {
        console.log("userID: ", userID);
        const workoutSets = await Sets.find({ workoutID });
        console.log("workoutSets: ", workoutSets);

        // Group sets by exerciseID and calculate total weight for each exercise
        const exerciseTotals = workoutSets.reduce((totals, set) => {
            const { exerciseID, reps, weight } = set;
            if (!totals[exerciseID]) {
                totals[exerciseID] = 0;
            }
            totals[exerciseID] += reps * weight;
            return totals;
        }, {});
  
        console.log("Exercise totals: ", exerciseTotals);

        // Update max weight for each exercise
        for (const exerciseID in exerciseTotals) {
            const totalWeight = exerciseTotals[exerciseID];

            // Retrieve the user's existing max weight for the specific exercise
            const existingMaxWeight = await UserMaxWeights.findOne({ userID, exerciseID });

            if (!existingMaxWeight || totalWeight > existingMaxWeight.maxWeight) {
                // If no existing max weight or current total weight exceeds the max weight,
                // update the max weight in the database
                const updatedMaxWeight = await UserMaxWeights.findOneAndUpdate(
                    { userID, exerciseID },
                    { maxWeight: totalWeight },
                    { upsert: true, new: true }
                );
                console.log(`Updated max weight for exercise ${exerciseID} and user ${userID}: `, updatedMaxWeight);
            } 
            else {
                console.log(`Current total weight for exercise ${exerciseID} does not exceed the existing max weight`);
            }
        }
    } catch (err) {
        console.error('Error updating Max Weight:', err);
    }
};

module.exports = {
    getAllMaxWeights,
    getMaxWeightFromUserIDAndExerciseID,
    checkAndUpdateMaxWeight
};