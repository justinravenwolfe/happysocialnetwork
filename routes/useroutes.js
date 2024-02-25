app.get('api/users', async(req, res) => {
//If things go well
try{
    //Looking for all users and populating metadata
    const users = await User.find().populate('thoughts').populate('friends');
    //Turning it into a string so its easy to work with/visualize
    res.json(users); 
//If there is an error
}catch {
console.log(err.message);
//Server error
res.status(500).send('Server Error'); 
}
}); 
//get, post, update, delete 


