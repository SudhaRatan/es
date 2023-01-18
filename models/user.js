const mongoose = require('mongoose')

const address = mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    addresses: [{
        type: address,
        required: true,
    }]
})

module.exports = mongoose.model('user', userSchema)