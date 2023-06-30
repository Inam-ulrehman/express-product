// orders/order.js

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  // Add order details here

  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be a positive number'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // Add more fields as needed
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
