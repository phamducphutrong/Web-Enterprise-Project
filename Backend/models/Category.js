const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    DateInnitiated: {
        type: Date
    },
    Status: {
        type: String,
        enum: ['Openning','Closed']
    }
})

module.exports = mongoose.model('Category',CategorySchema)