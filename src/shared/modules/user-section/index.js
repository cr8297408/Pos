const UserSectionService = require('./service');


async function findAll(req, res, next) {
  try {
    const UserSections = await UserSectionService.findAll(req.headers['authorization'])
    res.status(200).json(UserSections)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUserSection = await UserSectionService.create(req.headers['authorization'],req.body);
    res.status(201).json(getUserSection)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getUserSection = await UserSectionService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getUserSection)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const UserSection = await UserSectionService.delete(req.headers['authorization'],req.params.id)

    res.json(UserSection)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const UserSection = await UserSectionService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(UserSection)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const UserSections = await UserSectionService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(UserSections)    
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