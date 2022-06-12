const UserService = require('./service');


async function findAll(req, res, next) {
  try {
    const Users = await UserService.findAll()
    res.status(200).json(Users)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUser = await UserService.create(req.body);
    res.status(201).json(getUser)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getUser = await UserService.findOne(req.params.id)
    res.status(200).json(getUser)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getUser = await UserService.delete(req.params.id)

    res.json(getUser)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getUser = await UserService.update(req.params.id, req.body)
    res.json(getUser)
  } catch (error) {
    res.json(error.message)
  }
}


module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  updateOne
}