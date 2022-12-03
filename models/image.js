const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    imageData: {
        type: Array,
        required: true,
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    }
})

module.exports = mongoose.model('Image', imageSchema)