const PreparationService = require('./service');


async function findAll(req, res) {
  try {
    const Preparations = await PreparationService.findAll(req.headers['authorization'])
    res.status(Preparations.status).json(Preparations.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getPreparation = await PreparationService.create(req.headers['authorization'],req.body);
    res.status(getPreparation.status).json(getPreparation.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getPreparation = await PreparationService.findOne(req.headers['authorization'],req.params.id)
    res.status(getPreparation.status).json(getPreparation.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const Preparation = await PreparationService.delete(req.headers['authorization'],req.params.id)

    res.status(Preparation.status).json(Preparation.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Preparation = await PreparationService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Preparation.status).json(Preparation.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Preparations = await PreparationService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Preparations.status).json(Preparations.message);    
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