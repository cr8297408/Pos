const FiscalResponsibilityService = require('./service');


async function findAll(req, res) {
  try {
    const FiscalResponsibilitys = await FiscalResponsibilityService.findAll(req.headers['authorization'])
    res.status(FiscalResponsibilitys.status).json(FiscalResponsibilitys.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getFiscalResponsibility = await FiscalResponsibilityService.create(req.headers['authorization'],req.body);
    res.status(getFiscalResponsibility.status).json(getFiscalResponsibility.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getFiscalResponsibility = await FiscalResponsibilityService.findOne(req.headers['authorization'],req.params.id)
    res.status(getFiscalResponsibility.status).json(getFiscalResponsibility.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const FiscalResponsibility = await FiscalResponsibilityService.delete(req.headers['authorization'],req.params.id)

    res.status(FiscalResponsibility.status).json(FiscalResponsibility.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const FiscalResponsibility = await FiscalResponsibilityService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(FiscalResponsibility.status).json(FiscalResponsibility.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const FiscalResponsibilitys = await FiscalResponsibilityService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(FiscalResponsibilitys.status).json(FiscalResponsibilitys.message);    
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