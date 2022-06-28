const CompositionService = require('./service');


async function findAll(req, res, next) {
  try {
    const Compositions = await CompositionService.findAll(req.headers['authorization'])
    res.status(200).json(Compositions)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getComposition = await CompositionService.create(req.headers['authorization'],req.body);
    res.status(201).json(getComposition)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getComposition = await CompositionService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getComposition)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Composition = await CompositionService.delete(req.headers['authorization'],req.params.id)

    res.json(Composition)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Composition = await CompositionService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Composition)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Compositions = await CompositionService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Compositions)    
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