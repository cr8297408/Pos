const ProductParamService = require('./service');


async function findAll(req, res) {
  try {
    const ProductParams = await ProductParamService.findAll(req.headers['authorization'])
    res.status(ProductParams.status).json(ProductParams.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductParam = await ProductParamService.create(req.headers['authorization'],req.body);
    res.status(getProductParam.status).json(getProductParam.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getProductParam = await ProductParamService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductParam.status).json(getProductParam.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductParam = await ProductParamService.delete(req.headers['authorization'],req.params.id)
    res.status(ProductParam.status).json(ProductParam.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductParam = await ProductParamService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductParam.status).json(ProductParam.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ProductParams = await ProductParamService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductParams.status).json(ProductParams.message)   
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