const UnitMeasurementService = require('./service');


async function findAll(req, res, next) {
  try {
    const UnitMeasurements = await UnitMeasurementService.findAll(req.headers['authorization'])
    res.status(UnitMeasurements.status).json(UnitMeasurements.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUnitMeasurement = await UnitMeasurementService.create(req.headers['authorization'],req.body);
    res.status(getUnitMeasurement.status).json(getUnitMeasurement.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const getUnitMeasurement = await UnitMeasurementService.findOne(req.headers['authorization'],req.params.id)
    res.status(getUnitMeasurement.status).json(getUnitMeasurement.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const UnitMeasurement = await UnitMeasurementService.delete(req.headers['authorization'],req.params.id)

    res.status(UnitMeasurement.status).json(UnitMeasurement.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const UnitMeasurement = await UnitMeasurementService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(UnitMeasurement.status).json(UnitMeasurement.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const UnitMeasurements = await UnitMeasurementService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(UnitMeasurements.status).json(UnitMeasurements.message)    
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