const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//GET all orders
const getAllOrders = async (req, res) => {
    //#swagger.tags=['Orders']
    const result = await mongodb.getDatabase().db().collection('orders').find();
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
    });
};

// GET order by ID
const getSingleOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const orderId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('orders').find({ _id: orderId });
    const orders = await result.toArray();

    if (!orders[0]) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(orders[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred getting the order.' });
  }
};

// POST create order
const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    //#swagger.tags=['Orders']
    const order = {
      customerName: req.body.customerName,
      productId: req.body.productId,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
      createdAt: new Date()
    };
    const response = await mongodb.getDatabase().db().collection('orders').insertOne(order);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the order.');
    }
};

//PUT update a order
const updateOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //#swagger.tags=['Orders']
  try {
    const orderId = new ObjectId(req.params.id);
    const order = {
      customerName: req.body.customerName,
      productId: req.body.productId,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
      createdAt: new Date()
    };

    const result = await mongodb.getDatabase().db().collection('orders')
      .replaceOne({ _id: orderId }, order);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred while updating the order.' });
  }
};

//DELETE order
const deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders']
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('orders').deleteOne({ _id: orderId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
};