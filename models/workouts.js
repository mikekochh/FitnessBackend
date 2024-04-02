const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Workouts", workoutSchema)