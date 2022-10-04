const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    trafficNumber: {
        type: String,
        required: true
    },
    timeIn: {
        type: String,
        required: true
    },
    timeOut: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Traffic', trafficSchema);