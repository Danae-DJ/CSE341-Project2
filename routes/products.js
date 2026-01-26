const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

//GET all products
router.get('/', productsController.getAllProducts);

//GET products by ID
router.get('/:id', productsController.getSingleProduct);

//POST create product
router.post('/', productsController.createProduct);

//PUT update a product
router.put('/:id', productsController.updateProduct);

//DELETE product
router.delete('/:id', productsController.deleteProduct)

module.exports = router;