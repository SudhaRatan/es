const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    imageType: {
        type: String,
        required: false,
    },
    imageData: {
        type: String,
        required: false,
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    }
})

module.exports = mongoose.model('Image', imageSchema)