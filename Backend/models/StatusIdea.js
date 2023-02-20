const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema({
    Type:{
        type: String,
        enum:['Like','Dislike']
    },
    UserId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    IdeadId:{
        type:Schema.Types.ObjectId,
        ref:'Idea'
    }
})

module.exports = mongoose.model('StatusIdea',statusSchema)