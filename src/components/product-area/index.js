const ProductAreaService = require('./service');


async function findAll(req, res, next) {
  try {
    const ProductAreas = await ProductAreaService.findAll()
    res.status(200).json(ProductAreas)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProductArea = await ProductAreaService.create(req.body);
    res.status(201).json(getProductArea)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProductArea = await ProductAreaService.findOne(req.params.id)
    res.status(200).json(getProductArea)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getProductArea = await ProductAreaService.delete(req.params.id)

    res.json(getProductArea)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getProductArea = await ProductAreaService.update(req.params.id, req.body)
    res.json(getProductArea)
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