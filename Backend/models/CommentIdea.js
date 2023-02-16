const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    Content: {
        type: String
    },
    LastEdition:{
        type:Date
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    IdeaId: {
        type: Schema.Types.ObjectId,
        ref: 'Idea'
    }
})

module.exports = mongoose.model('CommentIdea',commentSchema)