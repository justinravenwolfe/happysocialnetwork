//Code for the reaction model 
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId()
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

const reaction = mongoose.model('reaction', reactionSchema); 
