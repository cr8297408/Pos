const ProductLineService = require('./service');


async function findAll(req, res) {
  try {
    const ProductLines = await ProductLineService.findAll(req.headers['authorization'])
    res.status(ProductLines.status).json(ProductLines.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductLine = await ProductLineService.create(req.headers['authorization'],req.body);
    res.status(getProductLine.status).json(getProductLine.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getProductLine = await ProductLineService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductLine.status).json(getProductLine.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductLine = await ProductLineService.delete(req.headers['authorization'],req.params.id)

    res.status(ProductLine.status).json(ProductLine.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductLine = await ProductLineService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductLine.status).json(ProductLine.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isAdmin} = req.body;
    const ProductLines = await ProductLineService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isAdmin);
    res.status(ProductLines.status).json(ProductLines.message)    
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