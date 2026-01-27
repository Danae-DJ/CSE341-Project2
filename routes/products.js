const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');//validation
const productsController = require('../controllers/products');

//GET all products
router.get('/', productsController.getAllProducts);

//GET products by ID
router.get('/:id',
    param('id').isMongoId(),
    productsController.getSingleProduct);

//POST create product
router.post('/',
    [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be 0 or more'),
    body('description').notEmpty().withMessage('Description is required'),
    body('brand').notEmpty().withMessage('Brand is required')
  ],
  productsController.createProduct
);

//PUT update a product
router.put('/:id',
    [
    param('id').isMongoId(),
    body('name').notEmpty(),
    body('price').isFloat({ gt: 0 }),
    body('category').notEmpty(),
    body('stock').isInt({ min: 0 }),
    body('description').notEmpty(),
    body('brand').notEmpty()
  ],
  productsController.updateProduct
);

//DELETE product
router.delete('/:id',
    param('id').isMongoId(),
  productsController.deleteProduct
);

module.exports = router;