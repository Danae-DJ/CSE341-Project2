const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');

//GET all orders
router.get('/', ordersController.getAllOrders);

//GET orders by ID
router.get('/:id', ordersController.getSingleOrder);

//POST create Order
router.post('/', ordersController.createOrder);

//PUT update a Order
router.put('/:id', ordersController.updateOrder);

//DELETE Order
router.delete('/:id', ordersController.deleteOrder)

module.exports = router;