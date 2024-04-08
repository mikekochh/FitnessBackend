const mongoose = require('mongoose')

const setSchema = new mongoose.Schema({
    workoutID: {
        type: String,
        required: true
    },
    exerciseID: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    weightUnit: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Sets", setSchema)