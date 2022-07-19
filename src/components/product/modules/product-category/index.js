const ProductCategoryService = require('./service');


async function findAll(req, res) {
  try {
    const ProductCategorys = await ProductCategoryService.findAll(req.headers['authorization'])
    res.status(ProductCategorys.status).json(ProductCategorys.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductCategory = await ProductCategoryService.create(req.headers['authorization'],req.body);
    res.status(getProductCategory.status).json(getProductCategory.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getProductCategory = await ProductCategoryService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductCategory.status).json(getProductCategory.message)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductCategory = await ProductCategoryService.delete(req.headers['authorization'],req.params.id)

    res.status(ProductCategory.status).json(ProductCategory.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductCategory = await ProductCategoryService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductCategory.status).json(ProductCategory.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ProductCategorys = await ProductCategoryService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductCategorys.status).json(ProductCategorys.message)    
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