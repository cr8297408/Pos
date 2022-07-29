const UserService = require('./service');


async function findAll(req, res, next) {
  try {
    const Users = await UserService.findAll(req.headers['authorization'])
    res.status(Users.status).json(Users.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getUser = await UserService.create(req.headers['authorization'],req.body);
    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const getUser = await UserService.findOne(req.headers['authorization'],req.params.id)
    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getUser = await UserService.delete(req.headers['authorization'],req.params.id)

    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function activateUser(req, res){
  try {
    const getUser = await UserService.activateUser(req.headers['authorization'],req.params.id)

    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getUser = await UserService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(getUser.status).json(getUser.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  console.log(req.body)
  try {
    const sizeAsNumber = req.body.size ?Number(req.body.size): 10;
    const pageAsNumber = req.body.page ?Number(req.body.page): 1;
    const where = req.body.where ? req.body.where: "";
    const isActive = req.body.isActive === 'inactive' ? false : true ;
    const Users = await UserService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Users.status).json(Users.message)    
  } catch (error) {
      throw new Error(error.message)
  }
}

async function putAvatar(req, res) {
  try {
    const {originalname, path} = req.file;
    const avatar = await UserService.putAvatar(req.headers['authorization'], originalname, path)
    res.status(avatar.status).json(avatar.message)
  } catch (error) {
    //res.json(error.message) 
  }
}

module.exports = {
  findAll,
  create,
  findOne,
  deleteOne,
  updateOne,
  findpagination,
  activateUser,
  putAvatar,
}