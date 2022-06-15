const ProductService = require('./service');


async function findAll(req, res, next) {
  try {
    const Products = await ProductService.findAll(req.headers['authorization'])
    res.status(200).json(Products)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProduct = await ProductService.create(req.headers['authorization'],req.body);
    res.status(201).json(getProduct)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProduct = await ProductService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getProduct)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Product = await ProductService.delete(req.headers['authorization'],req.params.id)

    res.json(Product)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Product = await ProductService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Product)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Products = await ProductService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Products)    
  } catch (error) {
      throw new Error(error.message)
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