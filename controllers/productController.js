// controllers/productController.js

const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')

// Create operation
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      purchasePrice,
      quantity,
      storagePoint,
      category,
      isAvailable,
    } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      purchasePrice,
      quantity,
      storagePoint,
      category,
      isAvailable,
    })
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Product created successfully',
      result: product,
    })
  } catch (err) {
    next(err)
  }
}

// Read operation: Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    const count = await Product.countDocuments()
    res
      .status(200)
      .json({ success: true, message: 'All products', count, result: products })
  } catch (err) {
    next(err)
  }
}

// Read operation: Get a product by ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Product not found', result: product })
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Single Product ', result: product })
  } catch (err) {
    next(err)
  }
}

// Update operation: Update a product by ID
const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Please provide name' })
      return
    }
    const product = await Product.findByIdAndUpdate(id, { name }, { new: true })
    if (!product) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Product not found', result: product })
      return
    }
    res
      .status(StatusCodes.ACCEPTED)
      .json({ success: true, message: 'Updated!', result: product })
  } catch (err) {
    next(err)
  }
}

// Delete operation: Delete a product by ID
const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Product not found', result: product })
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Deleted!', result: product })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
