const mongoose = require('mongoose');

const Farm = mongoose.model('Farm', {
    name: String,
    size: Number
});

module.exports = Farm