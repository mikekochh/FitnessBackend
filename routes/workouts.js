const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.get('/', workoutController.getAllWorkouts);
router.get('/inProgress/:userID', workoutController.getWorkoutInProgress);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutController.createWorkout);
router.patch('/complete/:id', workoutController.completeWorkout);
router.patch('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;