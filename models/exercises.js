const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    primaryMuscleGroup: {
        type: String,
        required: true
    },
    secondaryMuscleGroup: {
        type: String
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Exercises", exerciseSchema)