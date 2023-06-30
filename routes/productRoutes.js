// routes/productRoutes.js

const express = require('express')
const router = express.Router()

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productController')
const { authenticateAdmin } = require('../middleware/auth/adminAuth')
const { authenticateUser } = require('../middleware/auth/userAuth')

// Create a product
router.post('/', authenticateAdmin, createProduct)

// Retrieve all products
router.get('/', getAllProducts)

// Retrieve a product by ID
router.get('/:id', getProductById)

// Update a product by ID
router.put('/:id', authenticateAdmin, updateProductById)

// Delete a product by ID
router.delete('/:id', authenticateAdmin, deleteProductById)

module.exports = router
