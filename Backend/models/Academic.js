const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AcademicSchema = new Schema({
    Year: {
        type: String,
        required:true,
        unique:true
    },
    FirstClosureDate: {
        type: Date,
        required:true
    },
    LastClosureDate: {
        type: Date,
        required:true
    }
})

module.exports = mongoose.model('Academic',AcademicSchema)
