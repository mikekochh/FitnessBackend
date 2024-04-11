const express = require('express');
const router = express.Router();
const userMaxWeightController = require('../controllers/userMaxWeightController');

router.get('/', userMaxWeightController.getAllMaxWeights);
router.get('/:userID/:exerciseID', userMaxWeightController.getMaxWeightFromUserIDAndExerciseID);

module.exports = router;