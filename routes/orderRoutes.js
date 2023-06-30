// routes/orderRoutes.js

const express = require('express')
const router = express.Router()

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require('../controllers/orderController')
const { authenticateAdmin } = require('../middleware/auth/adminAuth')
const { authenticateUser } = require('../middleware/auth/userAuth')

// Create a order
router.post('/', authenticateAdmin, createOrder)

// Retrieve all orders
router.get('/', authenticateUser, getAllOrders)

// Retrieve a order by ID
router.get('/:id', authenticateUser, getOrderById)

// Update a order by ID
router.put('/:id', authenticateAdmin, updateOrderById)

// Delete a order by ID
router.delete('/:id', authenticateAdmin, deleteOrderById)

module.exports = router
