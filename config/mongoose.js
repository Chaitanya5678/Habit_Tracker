//Set up of mongoDB database connection using mongoose

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/habit_tracker_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;