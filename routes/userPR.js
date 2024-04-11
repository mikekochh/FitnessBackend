const express = require('express');
const router = express.Router();
const userPRController = require('../controllers/userPRController');

router.get('/', userPRController.getAllPRs);
router.get('/:userID/:exerciseID', userPRController.getPRFromUserIDAndExerciseID);

module.exports = router;