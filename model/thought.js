//Data model to create a thought <- post 
const thoughtSchema = new Schema({
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
    return this.reactions.length; 
});

const Thought = model('Thought', thoughtSchema); 


