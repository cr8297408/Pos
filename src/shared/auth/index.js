const AuthService = require('./service');


async function findAll(req, res, next) {
  try {
    const Auths = await AuthService.findAll()
    res.status(200).json(Auths)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getAuth = await AuthService.create(req.body);
    res.status(201).json(getAuth)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getAuth = await AuthService.findOne(req.params.id)
    res.status(200).json(getAuth)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getAuth = await AuthService.delete(req.params.id)

    res.json(getAuth)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getAuth = await AuthService.update(req.params.id, req.body)
    res.json(getAuth)
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