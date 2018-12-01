var mongoose = require('mongoose');

var banco = mongoose.Schema({
    nombre: String,
    cadenaMundial: String,
    añosFuncion: Number
});

module.exports = mongoose.model("banco",banco);