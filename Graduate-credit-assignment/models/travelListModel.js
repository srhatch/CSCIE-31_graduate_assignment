const mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    country: {type: String, required: true},
    dateVisited: {type: Date, required: true},
    favoriteSight: {type: String, required: true}
})

module.exports = mongoose.model('Travel List', listSchema);