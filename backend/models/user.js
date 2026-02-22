const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, requried: true},
    age: { type: Number, required: true},
    email: { type: String, required: true },
    phoneNum: { type: String, required: true },
    address: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);