const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const State = mongoose.model('State', stateSchema);

module.exports = State;