const ProductAreaService = require('./service');


async function findAll(req, res, next) {
  try {
    const ProductAreas = await ProductAreaService.findAll(req.headers['authorization'])
    res.status(200).json(ProductAreas)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getProductArea = await ProductAreaService.create(req.headers['authorization'], req.body);
    res.status(201).json(getProductArea)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getProductArea = await ProductAreaService.findOne(req.headers['authorization'], req.params.id)
    res.status(200).json(getProductArea)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getProductArea = await ProductAreaService.delete(req.headers['authorization'], req.params.id)

    res.json(getProductArea)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getProductArea = await ProductAreaService.update(req.headers['authorization'], req.params.id, req.body)
    res.json(getProductArea)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const productAreas = await ProductAreaService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(productAreas)    
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