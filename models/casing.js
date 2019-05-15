const mongoose = require('mongoose');
const shortid = require('shortid');

const casing = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    casingimage: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Casing', casing);