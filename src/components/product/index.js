const ProductService = require('./service');


async function findAll(req, res) {
  try {
    const Products = await ProductService.findAll(req.headers['authorization'])
    res.status(Products.status).json(Products.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProduct = await ProductService.create(req.headers['authorization'],req.body);
    res.status(getProduct.status).json(getProduct.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getProduct = await ProductService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProduct.status).json(getProduct.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const Product = await ProductService.delete(req.headers['authorization'],req.params.id)

    res.status(Product.status).json(Product.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Product = await ProductService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Product.status).json(Product.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Products = await ProductService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Products.status).json(Products.message);    
  } catch (error) {
    res.json(error.message)
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  updateOne,
  findpagination
}