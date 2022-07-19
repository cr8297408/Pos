const CompositionService = require('./service');


async function findAll(req, res, next) {
  try {
    const Compositions = await CompositionService.findAll(req.headers['authorization'])
    res.status(Compositions.status).json(Compositions.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getComposition = await CompositionService.create(req.headers['authorization'],req.body);
    res.status(getComposition.status).json(getComposition.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getComposition = await CompositionService.findOne(req.headers['authorization'],req.params.id)
    res.status(getComposition.status).json(getComposition.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Composition = await CompositionService.delete(req.headers['authorization'],req.params.id)

    res.status(Composition.status).json(Composition.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Composition = await CompositionService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Composition.status).json(Composition.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isAdmin} = req.body;
    const Compositions = await CompositionService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isAdmin);
    res.status(Compositions.status).json(Compositions.message)    
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