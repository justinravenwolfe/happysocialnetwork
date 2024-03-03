const User = require('../models/user.js'); // Import User model

//Get all the the users
exports.getAllUser = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users); 

    }catch(error){
         console.log(error.message); 
         res.status(500).json({message: "Server Error"}); 

    }
}; 

//Get a user by id 
exports.getUserById = async (req, res) => {
    const{userId} = req.params; //Getting the id the user gave in the parameters
    try{
        const users = await User.findById(userId);
        //If we didn't find the user
        if(!users){
            return res.status(404).json({message: "User not found"}); 
        }
        res.json(users); 

    }catch(error){
         console.log(error.message); 
         res.status(500).json({message: "Server Error"}); 
    }
}; 