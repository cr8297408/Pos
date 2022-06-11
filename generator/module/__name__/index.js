const __name__Service = require('./service');


async function findAll(req, res, next) {
  try {
    const __name__s = await __name__Service.findAll()
    res.status(200).json(__name__s)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const get__name__ = await __name__Service.create(req.body);
    res.status(201).json(get__name__)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const get__name__ = await __name__Service.findOne(req.params.id)
    res.status(200).json(get__name__)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const get__name__ = await __name__Service.delete(req.params.id)

    res.json(get__name__)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const get__name__ = await __name__Service.update(req.params.id, req.body)
    res.json(get__name__)
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