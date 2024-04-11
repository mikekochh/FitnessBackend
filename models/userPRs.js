const mongoose = require('mongoose')

const userPRSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    exerciseID: {
        type: String,
        required: true
    },
    workoutID: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    weightUnit: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("UserPR", userPRSchema)