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

const order = mongoose.Schema({
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    address: {
        type: address,
        required: true,
    },
    method:{
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        default: 'Ordered',
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: false,
    }
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
        required: false,
    }],
    orders: [{
        type: order,
        required: false,
    }],

})

module.exports = mongoose.model('user', userSchema)