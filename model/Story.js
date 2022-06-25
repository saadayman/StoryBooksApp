const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
status:{
    type:String,
    defualt:'public',
    enum:['public','private']
},
body:{
    type:String,
    requied:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
    

},{timestamps:true})
module.exports = mongoose.model('Story',StorySchema)