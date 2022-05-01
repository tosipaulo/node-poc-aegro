const mongoose = require('mongoose');

const Farm = mongoose.model('Farm', {
    name: String,
    chunks: [
        {
            name: String,
            size: Number,
            productions: Array
        }
    ]
});

module.exports = Farm