const EconomicActivitiesService = require('./service');


async function findAll(req, res) {
  try {
    const EconomicActivitiess = await EconomicActivitiesService.findAll(req.headers['authorization'])
    res.status(EconomicActivitiess.status).json(EconomicActivitiess.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getEconomicActivities = await EconomicActivitiesService.create(req.headers['authorization'],req.body);
    res.status(getEconomicActivities.status).json(getEconomicActivities.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getEconomicActivities = await EconomicActivitiesService.findOne(req.headers['authorization'],req.params.id)
    res.status(getEconomicActivities.status).json(getEconomicActivities.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const EconomicActivities = await EconomicActivitiesService.delete(req.headers['authorization'],req.params.id)

    res.status(EconomicActivities.status).json(EconomicActivities.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const EconomicActivities = await EconomicActivitiesService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(EconomicActivities.status).json(EconomicActivities.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const EconomicActivitiess = await EconomicActivitiesService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(EconomicActivitiess.status).json(EconomicActivitiess.message);    
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