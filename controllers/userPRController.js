const userPRService = require('../services/userPRService');

async function getAllPRs(req, res) {
    try {
        const PRs = await userPRService.getAllPRs();
        res.json(PRs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getPRFromUserIDAndExerciseID(req, res) {
    try {
        const { userID, exerciseID } = req.params;
        const PR = await userPRService.getPRFromUserIDAndExerciseID(userID, exerciseID);
        if (PR == null) {
            return res.status(404).json({ message: 'No PR for this users exercise' });
        }
        res.json(PR);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllPRs,
    getPRFromUserIDAndExerciseID
};