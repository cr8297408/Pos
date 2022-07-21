const ProductCurveService = require('./service');


async function findAll(req, res) {
  try {
    const ProductCurves = await ProductCurveService.findAll(req.headers['authorization'])
    res.status(ProductCurves.status).json(ProductCurves.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductCurve = await ProductCurveService.create(req.headers['authorization'],req.body);
    res.status(getProductCurve.status).json(getProductCurve.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getProductCurve = await ProductCurveService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductCurve.status).json(getProductCurve.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductCurve = await ProductCurveService.delete(req.headers['authorization'],req.params.id)
    res.status(ProductCurve.status).json(ProductCurve.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductCurve = await ProductCurveService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductCurve.status).json(ProductCurve.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ProductCurves = await ProductCurveService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductCurves.status).json(ProductCurves.message)   
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