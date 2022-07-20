const __name__Service = require('./service');


async function findAll(req, res, next) {
  try {
    const __name__s = await __name__Service.findAll(req.headers['authorization'])
    res.status(__name__s.status).json(__name__s.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const get__name__ = await __name__Service.create(req.headers['authorization'],req.body);
    res.status(get__name__.status).json(get__name__.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const get__name__ = await __name__Service.findOne(req.headers['authorization'],req.params.id)
    res.status(get__name__.status).json(get__name__.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const __name__ = await __name__Service.delete(req.headers['authorization'],req.params.id)
    res.status(__name__.status).json(__name__.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const __name__ = await __name__Service.update(req.headers['authorization'],req.params.id, req.body)
    res.status(__name__.status).json(__name__.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const __name__s = await __name__Service.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(__name__s.status).json(__name__s.message)   
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