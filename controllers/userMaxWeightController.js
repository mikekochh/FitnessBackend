const userMaxWeightService = require('../services/userMaxWeightService');

async function getAllMaxWeights(req, res) {
    try {
        const maxWeights = await userMaxWeightService.getAllMaxWeights();
        res.json(maxWeights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getMaxWeightFromUserIDAndExerciseID(req, res) {
    try {
        const { userID, exerciseID } = req.params;
        const maxWeight = await userMaxWeightService.getMaxWeightFromUserIDAndExerciseID(userID, exerciseID);
        if (maxWeight == null) {
            return res.status(404).json({ message: 'No max weight for this users exercise' });
        }
        res.json(maxWeight);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllMaxWeights,
    getMaxWeightFromUserIDAndExerciseID
};