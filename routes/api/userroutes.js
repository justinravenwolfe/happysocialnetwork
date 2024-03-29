const User = require('../../model/user.js');
const router = require("express").Router();


//Getting all user profiles
router.get('/', async (req, res) => {
    //If things go well
    try {
        //Looking for all users and populating metadata
        const users = await User.find().populate('thoughts').populate('friends');
        //Turning it into a string so its easy to work with/visualize
        res.json(users);
        //If there is an error
    } catch (err) {
        console.log(err.message);
        //Server error
        res.status(500).send('Server Error');
    }
});
//get, post, update, delete 
//Getting a single user profile by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.param.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }
        res.json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a new user

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//update a users data
router.put('/:id', async (req, res) => {
    try {
        //Try to find and update with given information 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser); 
    }
    catch (err) {
        //Have to create a new entry everything we update for management purposes 
        await User.findByIdAndDelete(req.params.id);
        res.status(500).send("Server Error");

    }
});

//deletion route
//Delete my user profile
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send("User Deleted");

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;