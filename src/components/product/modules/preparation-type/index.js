const PreparationTypeService = require('./service');


async function findAll(req, res, next) {
  try {
    const PreparationTypes = await PreparationTypeService.findAll(req.headers['authorization'])
    res.status(200).json(PreparationTypes)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getPreparationType = await PreparationTypeService.create(req.headers['authorization'],req.body);
    res.status(201).json(getPreparationType)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getPreparationType = await PreparationTypeService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getPreparationType)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const PreparationType = await PreparationTypeService.delete(req.headers['authorization'],req.params.id)

    res.json(PreparationType)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const PreparationType = await PreparationTypeService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(PreparationType)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const PreparationTypes = await PreparationTypeService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(PreparationTypes)    
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