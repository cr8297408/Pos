const EconomicActivitiesService = require('./service');


async function findAll(req, res, next) {
  try {
    const EconomicActivitiess = await EconomicActivitiesService.findAll(req.headers['authorization'])
    res.status(200).json(EconomicActivitiess)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getEconomicActivities = await EconomicActivitiesService.create(req.headers['authorization'],req.body);
    res.status(201).json(getEconomicActivities)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getEconomicActivities = await EconomicActivitiesService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getEconomicActivities)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const EconomicActivities = await EconomicActivitiesService.delete(req.headers['authorization'],req.params.id)

    res.json(EconomicActivities)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const EconomicActivities = await EconomicActivitiesService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(EconomicActivities)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const EconomicActivitiess = await EconomicActivitiesService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(EconomicActivitiess)    
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