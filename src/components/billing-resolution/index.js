const BillingResolutionService = require('./service');


async function findAll(req, res) {
  try {
    const BillingResolutions = await BillingResolutionService.findAll(req.headers["authorization"])
    res.status(BillingResolutions.status).json(BillingResolutions.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const BillingResolution = await BillingResolutionService.create(req.headers["authorization"],req.body);
    res.status(BillingResolution.status).json(BillingResolution.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getBillingResolution = await BillingResolutionService.findOne(req.headers["authorization"],req.params.id)
    res.status(getBillingResolution.status).json(getBillingResolution.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getBillingResolution = await BillingResolutionService.delete(req.headers["authorization"],req.params.id)

    res.status(getBillingResolution.status).json(getBillingResolution.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getBillingResolution = await BillingResolutionService.update(req.headers["authorization"],req.params.id, req.body)
    res.status(getBillingResolution.status).json(getBillingResolution.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const BillingResolutions = await BillingResolutionService.findPagination(req.headers["authorization"],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(BillingResolutions.status).json(BillingResolutions.message)    
  } catch (error) {
      res.json(error.message);
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