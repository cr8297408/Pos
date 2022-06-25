const PreparationService = require('./service');


async function findAll(req, res, next) {
  try {
    const Preparations = await PreparationService.findAll(req.headers['authorization'])
    res.status(200).json(Preparations)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getPreparation = await PreparationService.create(req.headers['authorization'],req.body);
    res.status(201).json(getPreparation)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getPreparation = await PreparationService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getPreparation)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Preparation = await PreparationService.delete(req.headers['authorization'],req.params.id)

    res.json(Preparation)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Preparation = await PreparationService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Preparation)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Preparations = await PreparationService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Preparations)    
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