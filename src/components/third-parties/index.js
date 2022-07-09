const ThirdPartiesService = require('./service');


async function findAll(req, res, next) {
  try {
    const ThirdPartiess = await ThirdPartiesService.findAll(req.headers['authorization'])
    res.status(200).json(ThirdPartiess)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getThirdParties = await ThirdPartiesService.create(req.headers['authorization'],req.body);
    res.status(201).json(getThirdParties)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getThirdParties = await ThirdPartiesService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getThirdParties)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const ThirdParties = await ThirdPartiesService.delete(req.headers['authorization'],req.params.id)

    res.json(ThirdParties)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ThirdParties = await ThirdPartiesService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(ThirdParties)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const ThirdPartiess = await ThirdPartiesService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(ThirdPartiess)    
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