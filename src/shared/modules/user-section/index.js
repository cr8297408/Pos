const UserSectionService = require('./service');


async function findAll(req, res, next) {
  try {
    const UserSections = await UserSectionService.findAll(req.headers['authorization'])
    res.status(UserSections.status).json(UserSections.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUserSection = await UserSectionService.create(req.headers['authorization'],req.body);
    res.status(getUserSection.status).json(getUserSection.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const getUserSection = await UserSectionService.findOne(req.headers['authorization'],req.params.id)
    res.status(getUserSection.status).json(getUserSection.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const UserSection = await UserSectionService.delete(req.headers['authorization'],req.params.id)

    res.status(UserSection.status).json(UserSection.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const UserSection = await UserSectionService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(UserSection.status).json(UserSection.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const UserSections = await UserSectionService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(UserSections.status).json(UserSections.message)    
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