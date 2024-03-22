const mongoose = require('mongoose'); 

//Connect to database
mongoose.connect('mongodb://localhost:27017/happyducksocialnetwork');

module.exports = mongoose.connection;


