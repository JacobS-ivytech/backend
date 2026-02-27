const mongoose = require('../db')

const User = mongoose.model("User", {
    username: { type: String, required: true },
    password: { type: String, required: true },
    status: String
})

module.exports = User;