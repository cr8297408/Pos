const BillingResolutionService = require('./service');


async function findAll(req, res, next) {
  try {
    const BillingResolutions = await BillingResolutionService.findAll()
    res.status(200).json(BillingResolutions)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const BillingResolution = await BillingResolutionService.create(req.body);
    res.status(201).json(BillingResolution)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getBillingResolution = await BillingResolutionService.findOne(req.params.id)
    res.status(200).json(getBillingResolution)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getBillingResolution = await BillingResolutionService.delete(req.params.id)

    res.json(getBillingResolution)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getBillingResolution = await BillingResolutionService.update(req.params.id, req.body)
    res.json(getBillingResolution)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const BillingResolutions = await BillingResolutionService.findPagination(sizeAsNumber, pageAsNumber, where);
    res.json(BillingResolutions)    
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