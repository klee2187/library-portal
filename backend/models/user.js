const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId: {
        type: String, 
        required: true 
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        requried: true
    },
    age: { 
        type: Number, 
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    phoneNum: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    image: {
        type: String, 
    },
    role: {
      type: String,
      enum: ['user', 'employee'],
      default: 'user'
    },
    readingList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', userSchema);