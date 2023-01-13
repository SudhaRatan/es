const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
  },
  productIds : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }]
})

module.exports = mongoose.model('cart', cartSchema)