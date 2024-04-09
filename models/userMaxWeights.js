const mongoose = require('mongoose')

const userMaxWeightSchema = new mongoose.Schema({
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
    maxWeight: {
        type: Number,
        required: true
    },
    weightUnit: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("UserMaxWeight", userMaxWeightSchema)