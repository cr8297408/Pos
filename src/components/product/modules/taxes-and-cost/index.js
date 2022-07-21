const TaxesAndCostService = require('./service');


async function findAll(req, res) {
  try {
    const TaxesAndCosts = await TaxesAndCostService.findAll(req.headers['authorization'])
    res.status(TaxesAndCosts.status).json(TaxesAndCosts.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getTaxesAndCost = await TaxesAndCostService.create(req.headers['authorization'],req.body);
    res.status(getTaxesAndCost.status).json(getTaxesAndCost.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getTaxesAndCost = await TaxesAndCostService.findOne(req.headers['authorization'],req.params.id)
    res.status(getTaxesAndCost.status).json(getTaxesAndCost.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const TaxesAndCost = await TaxesAndCostService.delete(req.headers['authorization'],req.params.id)
    res.status(TaxesAndCost.status).json(TaxesAndCost.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const TaxesAndCost = await TaxesAndCostService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(TaxesAndCost.status).json(TaxesAndCost.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const TaxesAndCosts = await TaxesAndCostService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(TaxesAndCosts.status).json(TaxesAndCosts.message)   
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