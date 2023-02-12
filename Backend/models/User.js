const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
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
        type: String,
        required: true,
        unique: true
    },
    Department: {
        type: String
    },
    Avatar: {
        type: String
    },
    AccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        unique:true
    }
})

module.exports = mongoose.model('User',UserSchema)