const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new Schema({
    Link: {
        type: String
    },
    DateUpload: {
        type: Date,
    },
    IdeaId: {
        type: Schema.Types.ObjectId,
        ref: 'Idea'
    }
})

module.exports = mongoose.model('File',FileSchema)