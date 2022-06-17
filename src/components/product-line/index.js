const ProductLineService = require('./service');


async function findAll(req, res, next) {
  try {
    const ProductLines = await ProductLineService.findAll(req.headers['authorization'])
    res.status(200).json(ProductLines)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProductLine = await ProductLineService.create(req.headers['authorization'],req.body);
    res.status(201).json(getProductLine)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProductLine = await ProductLineService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getProductLine)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ProductLine = await ProductLineService.delete(req.headers['authorization'],req.params.id)

    res.json(ProductLine)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductLine = await ProductLineService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(ProductLine)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const ProductLines = await ProductLineService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(ProductLines)    
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