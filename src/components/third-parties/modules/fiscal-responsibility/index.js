const FiscalResponsibilityService = require('./service');


async function findAll(req, res, next) {
  try {
    const FiscalResponsibilitys = await FiscalResponsibilityService.findAll(req.headers['authorization'])
    res.status(200).json(FiscalResponsibilitys)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getFiscalResponsibility = await FiscalResponsibilityService.create(req.headers['authorization'],req.body);
    res.status(201).json(getFiscalResponsibility)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getFiscalResponsibility = await FiscalResponsibilityService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getFiscalResponsibility)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const FiscalResponsibility = await FiscalResponsibilityService.delete(req.headers['authorization'],req.params.id)

    res.json(FiscalResponsibility)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const FiscalResponsibility = await FiscalResponsibilityService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(FiscalResponsibility)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const FiscalResponsibilitys = await FiscalResponsibilityService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(FiscalResponsibilitys)    
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