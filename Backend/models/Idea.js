const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IdeaSchema = new Schema({
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    LastEdition: {
        type: Date
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Idea',IdeaSchema)