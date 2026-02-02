const { validationResult } = require('express-validator');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//GET all products
const getAllProducts = async (req, res) => {
  //#swagger.tags=['Products']
  try {
    const result = await mongodb.getDatabase().db().collection('products').find();
    const products = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred getting products.' });
  }
};

// GET product by ID
const getSingleProduct = async (req, res) => {
  //#swagger.tags=['Products']
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
    const products = await result.toArray();

    if (!products[0]) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(products[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred getting the product.' });
  }
};

// POST create product
const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //#swagger.tags=['Products']
  try {
    const product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      description: req.body.description,
      brand: req.body.brand,
      createdAt: new Date()
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the product.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while creating the product.' });
  }
};

// PUT update a product
const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //#swagger.tags=['Products']
  try {
    const productId = new ObjectId(req.params.id);
    const product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      description: req.body.description,
      brand: req.body.brand,
      createdAt: new Date()
    };

    const result = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred while updating the product.' });
  }
};

//DELETE product
const deleteProduct = async (req, res) => {
  //#swagger.tags=['Products']
  try {
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });
    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the product.' });
  }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};