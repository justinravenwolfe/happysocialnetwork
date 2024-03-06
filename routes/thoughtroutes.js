thought = require('../model/thought.js'); 
user = require('../model/user.js'); 
const express = require('express'); 
const app = express(); 

const router = express.Router();

//Link for posts 
app.get('api/thoughts', async(req, res) => {
//If things go well
try{
    //Looking for all users and populating metadata
    const thoughts = await thought.find().populate('user').populate('reactions');
    //Turning it into a string so its easy to work with/visualize
    res.json(thoughts); 
//If there is an error
}catch (err) {
console.log(err.message);
//Server error
res.status(500).send('Server Error'); 
}
}); 
//get, post, update, delete 
//Link for when you are looking at a specific users posts
app.get('api/thoughts/:id', async(req, res) => {
    try {
        const thoughts  = await thought.findById(req.param.id).populate('user').populate('reactions');
        if(!thoughts){
            return res.status(404).json({msg: "Thought Not Found"});
        }
        res.json(user); 
    }
    catch (err){
        console.log(err.message);
        res.status(500).send('Server Error'); 
    }
}); 

// Create a new user
//app.post<- Express function <- adding a new entry to database <- Create a new post 
app.post('api/thoughts', async(req, res) => {
try{
    const newThought = await thought.create(req.body);
    res.json(newThought);

}catch(err){
    console.log(err.message);
    res.status(500).send("Server Error");
}
});

//update a users data
//app.put <- updating data <- If you want to change a post after the fact
app.put('api/thoughts/:id', async(req, res) => {
    try{
        //Try to find and update with given information 
        const updatedThought = await thought.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedThought);
    }
    catch(err){
        //Have to create a new entry everything we update for management purposes 
        await thought.findByIdAndDelete(req.params.id);
        res.status(500).send("Server Error");

    }
});

//deletion route <- Deleting my post
//app.delete <- deleting from database
app.delete('api/thoughts/:id', async(req, res) => {
    try{
        await thought.findByIdAndDelete(req.params.id);
        res.json({msg: "Thought Deleted"}); 

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}); 

module.exports = router; 