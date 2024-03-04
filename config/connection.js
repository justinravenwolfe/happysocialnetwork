const express = require('express'); 
const mongoose = require('mongoose'); 
//Cross origin resource sharing 
const cors = require('cors');
const userRoutes = require('../routes/useroutes.js'); // Import the user routes file
const thoughtRoutes = require('../routes/thoughtroutes.js'); // Import the thought routes file


//Starts the express app 
const app = express(); 
app.use(cors());
//Choose the port
const PORT = process.env.PORT || 3000; 

//App uses json/express to serve content
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
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
app.get('/', (req, res) => {
    res.send('Hello, world!');
});



