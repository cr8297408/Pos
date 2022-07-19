const ProductStructureService = require('./service');


async function findAll(req, res) {
  try {
    const ProductStructures = await ProductStructureService.findAll(req.headers['authorization'])
    res.status(ProductStructures.status).json(ProductStructures.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductStructure = await ProductStructureService.create(req.headers['authorization'],req.body);
    res.status(getProductStructure.status).json(getProductStructure.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getProductStructure = await ProductStructureService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductStructure.status).json(getProductStructure.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductStructure = await ProductStructureService.delete(req.headers['authorization'],req.params.id)

    res.status(ProductStructure.status).json(ProductStructure.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductStructure = await ProductStructureService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductStructure.status).json(ProductStructure.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.bosy.size);
    const pageAsNumber = Number(req.bosy.page);
    const {where, isActive} = req.body;
    const ProductStructures = await ProductStructureService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductStructures.status).json(ProductStructures.message)    
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