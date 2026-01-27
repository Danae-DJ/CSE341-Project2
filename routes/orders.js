const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const ordersController = require('../controllers/orders');

//GET all orders
router.get('/', ordersController.getAllOrders);

//GET orders by ID
router.get('/:id',
    param('id').isMongoId().withMessage('Invalid order ID'),
    ordersController.getSingleOrder);

//POST create Order
router.post('/',
    body('customerName').notEmpty().withMessage('customerName is required'),
    body('productId').isMongoId().withMessage('productId must be a valid Mongo ID'),
    body('quantity').isInt({ min: 1 }).withMessage('quantity must be at least 1'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('totalPrice must be a number'),
    body('status').notEmpty().withMessage('status is required'),
    ordersController.createOrder
);

//PUT update a Order
router.put('/:id', param('id').isMongoId().withMessage('Invalid order ID'),
    body('customerName').notEmpty().withMessage('customerName is required'),
    body('productId').isMongoId().withMessage('productId must be a valid Mongo ID'),
    body('quantity').isInt({ min: 1 }).withMessage('quantity must be at least 1'),
    body('totalPrice').isFloat({ min: 0 }).withMessage('totalPrice must be a number'),
    body('status').notEmpty().withMessage('status is required'),
);

//DELETE Order
router.delete('/:id',
    param('id').isMongoId().withMessage('Invalid order ID'),
    ordersController.deleteOrder
);

module.exports = router;