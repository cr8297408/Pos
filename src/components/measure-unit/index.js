const MeasureUnitService = require('./service');


async function findAll(req, res, next) {
  try {
    const MeasureUnits = await MeasureUnitService.findAll(req.headers['authorization'])
    res.status(MeasureUnits.status).json(MeasureUnits.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getMeasureUnit = await MeasureUnitService.create(req.headers['authorization'], req.body);
    res.status(getMeasureUnit.status).json(getMeasureUnit.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getMeasureUnit = await MeasureUnitService.findOne(req.headers['authorization'], req.params.id)
    res.status(getMeasureUnit.status).json(getMeasureUnit.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getMeasureUnit = await MeasureUnitService.delete(req.headers['authorization'], req.params.id)

    res.status(getMeasureUnit.status).json(getMeasureUnit.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getMeasureUnit = await MeasureUnitService.update(req.headers['authorization'], req.params.id, req.body)
    res.status(getMeasureUnit.status).json(getMeasureUnit.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const MeasureUnits = await MeasureUnitService.findPagination(req.headers['authorization'], sizeAsNumber, pageAsNumber, where, isActive);
    res.status(MeasureUnits.status).json(MeasureUnits.message)    
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