// controllers/orderController.js

const { StatusCodes } = require('http-status-codes')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

// Create operation
const createOrder = async (req, res, next) => {
  const { quantity, price, productId, purchasePrice } = req.body
  const createdBy = req.user.userId

  try {
    //  check if product exists and quantity is available
    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { quantity: -quantity } },
      { new: true }
    )
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Product not found' })
    }
    if (product.quantity < 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Quantity not available' })
    }

    const order = await Order.create({
      quantity,
      price,
      productId,
      createdBy,
      purchasedBy,
      purchasePrice,
    })
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Order created successfully',
      result: order,
    })
  } catch (err) {
    next(err)
  }
}

// Read operation: Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
    const count = await Order.countDocuments()
    res
      .status(200)
      .json({ success: true, message: 'All orders', count, result: orders })
  } catch (err) {
    next(err)
  }
}

// Read operation: Get a order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findById(id)
    if (!order) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Order not found', result: order })
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Single Order ', result: order })
  } catch (err) {
    next(err)
  }
}

// Update operation: Update a order by ID
const updateOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body
    if (!name) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Please provide name' })
      return
    }
    const order = await Order.findByIdAndUpdate(id, { name }, { new: true })
    if (!order) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Order not found', result: order })
      return
    }
    res
      .status(StatusCodes.ACCEPTED)
      .json({ success: true, message: 'Updated!', result: order })
  } catch (err) {
    next(err)
  }
}

// Delete operation: Delete a order by ID
const deleteOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findByIdAndDelete(id)
    if (!order) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Order not found', result: order })
    }
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Deleted!', result: order })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
}
