const express = require('express'); 
const mongoose = require('mongoose'); 

//Starts the express app 
const app = express(); 

//Choose the port
const PORT = process.env.PORT || 3000; 

//App uses json/express to serve content
app.use(express.json());

//Connect to database
mongoose.connect('mongodb://localhost:27017/happyducksocialnetwork',{});

//Connect the mongoose side 
mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected to the database");
}); 

//Connect the app side<- express
app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT); 
}); 



