const mongoose = require('mongoose');

const seriesInfoSchema = new mongoose.Schema({
    series: { type: String},
    bookNumber: { type: Number}
}, { _id: false });

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    image: {
        type: String,
        default: 'placeholder.jpg'
    },
    author: { 
        type: String, 
        required: true
    },
    genre: { 
        type: String, 
        required: true
    },
    year: { 
        type: Number, 
        required: true 
    },
    publishedBy: { 
        type: String, 
        required: true 
    },
    ageGroup: { 
        type: String, 
        required: true 
    },
    themes: { 
        type: [String], 
        default: [] 
    },
    setting: { 
        type: String 
    },
    seriesInfo: {
        type: seriesInfoSchema,
        default: null
    }
});

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);