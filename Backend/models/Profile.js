const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    Name: {
        type: String
    },
    Gender: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    DoB: {
        type: Date
    },
    Email: {
        type: String
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

module.exports = mongoose.model('Profile', ProfileSchema)