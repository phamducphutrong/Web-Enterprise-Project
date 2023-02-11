const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required:true
    },
    Gender: {
        type: String,
        required:true,
        enum: ['Male','Female']
    },
    PhoneNumber: {
        type: String,
        required:true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    DoB: {
        type: Date
    },
    Email: {
        type: Email,
        required: true,
        unique: true
    },
    Department: {
        type: String
    },
    Avatar: {
        type: String
    },
    AccountUsername: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

module.exports = mongoose.model('User',UserSchema)