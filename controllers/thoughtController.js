import thought from "../models/thought.js"; 

exports.getAllThoughts = async (req, res) => {
    try{
        const thoughts = await thought.find();
        res.json(thoughts); 

    }catch(error){
         console.log(error.message); 
         res.status(500).json({message: "Server Error"}); 

    }
}; 

//Get a user by id 
exports.getThoughtById = async (req, res) => {
    const{thoughtId} = req.params; //Getting the id the user gave in the parameters
    try{
        const thoughts = await thought.findById(thoughtId);
        //If we didn't find the user
        if(!thoughts){
            return res.status(404).json({message: "User not found"}); 
        }
        res.json(thoughts); 

    }catch(error){
         console.log(error.message); 
         res.status(500).json({message: "Server Error"}); 
    }
}; 