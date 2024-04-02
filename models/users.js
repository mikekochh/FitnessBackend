const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createData: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.export = mongoose.model("Users", userSchema)