const ProductSalePriceService = require('./service');


async function findAll(req, res) {
  try {
    const ProductSalePrices = await ProductSalePriceService.findAll(req.headers['authorization'])
    res.status(ProductSalePrices.status).json(ProductSalePrices.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductSalePrice = await ProductSalePriceService.create(req.headers['authorization'],req.body);
    res.status(getProductSalePrice.status).json(getProductSalePrice.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getProductSalePrice = await ProductSalePriceService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductSalePrice.status).json(getProductSalePrice.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductSalePrice = await ProductSalePriceService.delete(req.headers['authorization'],req.params.id)
    res.status(ProductSalePrice.status).json(ProductSalePrice.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductSalePrice = await ProductSalePriceService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductSalePrice.status).json(ProductSalePrice.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ProductSalePrices = await ProductSalePriceService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductSalePrices.status).json(ProductSalePrices.message)   
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