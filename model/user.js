
//Data to the model
const { Schema, model } = require('mongoose'); 

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true  //remove whitespace from both ends of the string
    },
    email: {
        type: String, 
        required: true,
        unique:  true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] //regex email
        //alliyah@gmail.com
        //regex <- token, wildcard <- when a token can be anything 
        //greg@com <- invalid .com,   
    },
    //Array of thoughts
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought',  //references to the throughout model
        }
    ],
    //array of friends
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',  //references to the throughout model 
        }
    ]
}); 

//Behavior 

//export the number of friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length; 
});

//Exporting the template/all its related variables
const User = model('User', userSchema); 

module.exports = User;