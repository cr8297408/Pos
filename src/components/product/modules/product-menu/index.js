const ProductMenuService = require('./service');


async function findAll(req, res) {
  try {
    const ProductMenus = await ProductMenuService.findAll(req.headers['authorization'])
    res.status(ProductMenus.status).json(ProductMenus.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getProductMenu = await ProductMenuService.create(req.headers['authorization'],req.body);
    res.status(getProductMenu.status).json(getProductMenu.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getProductMenu = await ProductMenuService.findOne(req.headers['authorization'],req.params.id)
    res.status(getProductMenu.status).json(getProductMenu.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const ProductMenu = await ProductMenuService.delete(req.headers['authorization'],req.params.id)
    res.status(ProductMenu.status).json(ProductMenu.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const ProductMenu = await ProductMenuService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(ProductMenu.status).json(ProductMenu.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function addProducts(req, res){
  try {
    const product = await ProductMenuService.addProducts(req.headers['authorization'], req.params.id, req.body)
    res.status(product.status).json(product.message);
  } catch (error) {
    res.json(error)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const ProductMenus = await ProductMenuService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(ProductMenus.status).json(ProductMenus.message)   
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
  findpagination,
  addProducts
}