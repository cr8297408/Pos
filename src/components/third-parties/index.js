const ThirdPartiesService = require('./service');


async function findAll(req, res) {
  try {
    const ThirdPartiess = await ThirdPartiesService.findAll(req.headers['authorization'])
    res.status(ThirdPartiess.status).json(ThirdPartiess.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getThirdParties = await ThirdPartiesService.create(req.headers['authorization'],req.body);
    res.status(getThirdParties.status).json(getThirdParties.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getThirdParties = await ThirdPartiesService.findOne(req.headers['authorization'],req.params.id)
    res.status(getThirdParties.status).json(getThirdParties.message)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ThirdParties = await ThirdPartiesService.delete(req.headers['authorization'],req.params.id)

    res.status(ThirdParties.status).json(ThirdParties.message);
  } catch (error) {
    res.json(error.message);
  }
}

async function updateOne(req, res){
  try {
    const ThirdParties = await ThirdPartiesService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ThirdParties.status).json(ThirdParties.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ThirdPartiess = await ThirdPartiesService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
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