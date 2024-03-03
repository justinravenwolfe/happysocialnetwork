//Data model to create a thought <- post 
const express = require('express'); 
const mongoose = require('mongoose'); 
//Cross origin resource sharing 
const cors = require('cors');
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

const thoughtSchema = new mongoose.Schema({
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

const Thought = mongoose.model('Thought', thoughtSchema); 


