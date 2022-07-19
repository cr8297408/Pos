const ProductAreaService = require('./service');


async function findAll(req, res) {
  try {
    const ProductAreas = await ProductAreaService.findAll(req.headers['authorization'])
    res.status(ProductAreas.status).json(ProductAreas.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductArea = await ProductAreaService.create(req.headers['authorization'], req.body);
    res.status(getProductArea.status).json(getProductArea.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getProductArea = await ProductAreaService.findOne(req.headers['authorization'], req.params.id)
    res.status(getProductArea.status).json(getProductArea.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getProductArea = await ProductAreaService.delete(req.headers['authorization'], req.params.id)

    res.status(getProductArea.status).json(getProductArea.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getProductArea = await ProductAreaService.update(req.headers['authorization'], req.params.id, req.body)
    res.status(getProductArea.status).json(getProductArea.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const productAreas = await ProductAreaService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(productAreas.status).json(productAreas.message)    
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