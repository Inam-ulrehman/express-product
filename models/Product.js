const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  purchasePrice: {
    type: Number,
    required: true,
    min: [0, 'Purchase price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be a positive number'],
  },
  storagePoint: {
    type: String,
    trim: true,
    maxlength: [50, 'Storage point cannot be more than 50 characters'],
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, 'Category cannot be more than 50 characters'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Add more fields as needed
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
