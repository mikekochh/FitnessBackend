const express = require('express');
const router = express.Router();
const setController = require('../controllers/setController');

router.get('/', setController.getAllSets);
router.get('/:id', setController.getSetById);
router.post('/', setController.createSet);
router.patch('/:id', setController.updateSet);
router.delete('/:id', setController.deleteSet);
router.get('/workoutID/:workoutID', setController.getSetsByWorkoutID);

module.exports = router;