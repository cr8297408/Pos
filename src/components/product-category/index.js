const ProductCategoryService = require('./service');


async function findAll(req, res, next) {
  try {
    const ProductCategorys = await ProductCategoryService.findAll(req.headers['authorization'])
    res.status(200).json(ProductCategorys)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProductCategory = await ProductCategoryService.create(req.headers['authorization'],req.body);
    res.status(201).json(getProductCategory)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProductCategory = await ProductCategoryService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getProductCategory)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ProductCategory = await ProductCategoryService.delete(req.headers['authorization'],req.params.id)

    res.json(ProductCategory)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductCategory = await ProductCategoryService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(ProductCategory)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const ProductCategorys = await ProductCategoryService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(ProductCategorys)    
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