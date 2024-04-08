const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    inProgress: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Workouts", workoutSchema)