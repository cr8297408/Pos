const ProductGroupService = require('./service');


async function findAll(req, res, next) {
  try {
    const ProductGroups = await ProductGroupService.findAll(req.headers['authorization'])
    res.status(200).json(ProductGroups)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProductGroup = await ProductGroupService.create(req.headers['authorization'],req.body);
    res.status(201).json(getProductGroup)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProductGroup = await ProductGroupService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getProductGroup)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ProductGroup = await ProductGroupService.delete(req.headers['authorization'],req.params.id)

    res.json(ProductGroup)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductGroup = await ProductGroupService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(ProductGroup)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const ProductGroups = await ProductGroupService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(ProductGroups)    
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