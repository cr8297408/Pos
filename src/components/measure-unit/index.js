const MeasureUnitService = require('./service');


async function findAll(req, res, next) {
  try {
    const MeasureUnits = await MeasureUnitService.findAll()
    res.status(200).json(MeasureUnits)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getMeasureUnit = await MeasureUnitService.create(req.body);
    res.status(201).json(getMeasureUnit)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getMeasureUnit = await MeasureUnitService.findOne(req.params.id)
    res.status(200).json(getMeasureUnit)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getMeasureUnit = await MeasureUnitService.delete(req.params.id)

    res.json(getMeasureUnit)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getMeasureUnit = await MeasureUnitService.update(req.params.id, req.body)
    res.json(getMeasureUnit)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const MeasureUnits = await MeasureUnitService.findPagination(sizeAsNumber, pageAsNumber);
    res.json(MeasureUnits)    
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