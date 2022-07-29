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
    const sizeAsNumber = req.body.size ?Number(req.body.size): 10;
    const pageAsNumber = req.body.page ?Number(req.body.page): 1;
    const where = req.body.where ? req.body.where: "";
    const idRoot = req.body.idRoot ? req.body.idRoot: "";
    const isActive = req.body.isActive === 'inactive' ? false : true ;
    const ProductLines = await ProductLineService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive, idRoot);
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