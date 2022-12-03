const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // category: {
    //     type: String,
    //     required: true,
    // },
    brand: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Product', productSchema)