const PreparationTypeService = require('./service');


async function findAll(req, res) {
  try {
    const PreparationTypes = await PreparationTypeService.findAll(req.headers['authorization'])
    res.status(PreparationTypes.status).json(PreparationTypes.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getPreparationType = await PreparationTypeService.create(req.headers['authorization'],req.body);
    res.status(getPreparationType.status).json(getPreparationType.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getPreparationType = await PreparationTypeService.findOne(req.headers['authorization'],req.params.id)
    res.status(getPreparationType.status).json(getPreparationType.message)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const PreparationType = await PreparationTypeService.delete(req.headers['authorization'],req.params.id)

    res.status(PreparationType.status).json(PreparationType.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const PreparationType = await PreparationTypeService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(PreparationType.status).json(PreparationType.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const PreparationTypes = await PreparationTypeService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(PreparationTypes.status).json(PreparationTypes.message)    
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