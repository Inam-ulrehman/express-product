// controllers/productController.js

const { StatusCodes } = require('http-status-codes')
const Product = require('../models/Product')

// Create operation
const createProduct = async (req, res, next) => {
  const createdBy = req.user.userId
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
      createdBy,
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
  const searchQuery = req.query.search // Get the search query from the request query parameters
  const page = parseInt(req.query.page) || 1 // Get the page number from the request query parameters, default is 1
  const limit = parseInt(req.query.limit) || 10 // Get the limit from the request query parameters, default is 10
  const sort = req.query.sort || '-createdAt' // Get the sort parameter from the request query parameters, default is -createdAt

  // Create a regex pattern to match the search query case-insensitively
  const regexPattern = new RegExp(searchQuery, 'i')

  const query = {
    $or: [
      { name: regexPattern },
      { description: regexPattern },
      { category: regexPattern },
    ],
  }
  try {
    const totalSearchCount = await Product.countDocuments(query) // Get the total count of matching users
    const totalData = await Product.countDocuments()

    const totalPages = Math.ceil(totalSearchCount / limit) // Calculate the total number of pages based on the limit

    const offset = (page - 1) * limit // Calculate the offset based on the page and limit

    const product = await Product.find(query, '-__v ')
      .sort(sort) // Sort the users based on the provided sort parameter
      .skip(offset)
      .limit(limit)

    res.status(200).json({
      success: true,
      message: 'All Products',
      totalData,
      totalSearchCount,
      countOnPage: product.length,
      totalPages,
      currentPage: page,
      result: product,
    })
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

// Update operation: Update a product by ID admin only
const updateProductById = async (req, res, next) => {
  const updatedBy = req.user.userId
  try {
    const { id } = req.params
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

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        purchasePrice,
        quantity,
        storagePoint,
        category,
        isAvailable,
        updatedBy,
      },
      { new: true }
    )
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
      return res
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
