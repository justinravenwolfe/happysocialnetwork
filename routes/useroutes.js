app.get('api/users', async(req, res) => {
//If things go well
try{
    //Looking for all users and populating metadata
    const users = await User.find().populate('thoughts').populate('friends');
    //Turning it into a string so its easy to work with/visualize
    res.json(users); 
//If there is an error
}catch (err) {
console.log(err.message);
//Server error
res.status(500).send('Server Error'); 
}
}); 
//get, post, update, delete 

app.get('api/users/:id', async(req, res) => {
    try {
        const user  = await User.findById(req.param.id).populate('thoughts').populate('friends');
        if(!user){
            return res.status(404).json({msg: "User Not Found"});
        }
        res.json(user); 
    }
    catch (err){
        console.log(err.message);
        res.status(500).send('Server Error'); 
    }
}); 

// Create a new user

app.post('api/users', async(req, res) => {
try{
    const newUser = await User.create(req.body);
    res.json(newUser);

}catch(err){
    console.log(err.message);
    res.status(500).send("Server Error");
}
});

//update a users data
app.put('api/users/:id', async(req, res) => {
    try{
        //Try to find and update with given information 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedUser);
    }
    catch(err){
        //Have to create a new entry everything we update for management purposes 
        await User.findByIdAndDelete(req.params.id);
        res.status(500).send("Server Error");

    }
});

//deletion route
app.delete('api/users/:id', async(req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({msg: "User Deleted"}); 

    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}); 