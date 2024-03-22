//Data model to create a thought <- post 
const { Schema, model} = require('mongoose'); 

const reactionSchema = new Schema({ // Comment
    reactionId: {
        type: Schema.Types.ObjectId, 
        default: () => new Schema.Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true,
        minLength: 1, 
        maxLength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtVal => dateFormat(createAtVal)
    }
}); 

const reaction = model('reaction', reactionSchema); 

const thoughtSchema = new Schema({ // Post 
 thoughtText:{
    type: String, 
    required: true, 
    minLength: 1,
    maxLength: 280, 
 },
 createdAt: {
    type: Date,
    default: Date.now,
    get: createAtVal => dateFormat(createAtVal)
 },
 username: {
    type: String, 
    required: true
 },
 reactions: [reactionSchema]
}); 

//Virtual method <- to find the number of reactions a user gets 
thoughtSchema.virtual('reactionCount').get(function() {
    //How many people reacted to a thought <- comments
    return this.reactions.length; 
});

const Thought = model('Thought', thoughtSchema); 

module.exports = Thought;
