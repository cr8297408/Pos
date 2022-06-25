const ProductStructureService = require('./service');


async function findAll(req, res, next) {
  try {
    const ProductStructures = await ProductStructureService.findAll(req.headers['authorization'])
    res.status(200).json(ProductStructures)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProductStructure = await ProductStructureService.create(req.headers['authorization'],req.body);
    res.status(201).json(getProductStructure)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProductStructure = await ProductStructureService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getProductStructure)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ProductStructure = await ProductStructureService.delete(req.headers['authorization'],req.params.id)

    res.json(ProductStructure)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductStructure = await ProductStructureService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(ProductStructure)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const ProductStructures = await ProductStructureService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(ProductStructures)    
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