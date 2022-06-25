const UnitMeasurementService = require('./service');


async function findAll(req, res, next) {
  try {
    const UnitMeasurements = await UnitMeasurementService.findAll(req.headers['authorization'])
    res.status(200).json(UnitMeasurements)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUnitMeasurement = await UnitMeasurementService.create(req.headers['authorization'],req.body);
    res.status(201).json(getUnitMeasurement)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getUnitMeasurement = await UnitMeasurementService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getUnitMeasurement)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const UnitMeasurement = await UnitMeasurementService.delete(req.headers['authorization'],req.params.id)

    res.json(UnitMeasurement)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const UnitMeasurement = await UnitMeasurementService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(UnitMeasurement)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const UnitMeasurements = await UnitMeasurementService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(UnitMeasurements)    
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