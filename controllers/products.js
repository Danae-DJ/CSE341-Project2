const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//GET all products
const getAllProducts = async (req, res) => {
    //#swagger.tags=['Products']
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
};

// GET product by ID
const getSingleProduct = async (req, res) => {
  //#swagger.tags=['Products']
  try {
    const productId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
      result.toArray().then((products) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(products[0]);
      });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the product.' });
  }
};

// POST create product
const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
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
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

//PUT update a product
const updateProduct = async (req, res) => {
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

    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the product.');
  }
};

//DELETE product
const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the product.');
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};