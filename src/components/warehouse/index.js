const WarehouseService = require('./service');


async function findAll(req, res, next) {
  try {
    const Warehouses = await WarehouseService.findAll(req.headers['authorization'])
    res.status(200).json(Warehouses)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const Warehouse = await WarehouseService.create(req.headers['authorization'],req.body);
    res.status(201).json(Warehouse)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getWarehouse = await WarehouseService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getWarehouse)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getWarehouse = await WarehouseService.delete(req.headers['authorization'],req.params.id)

    res.json(getWarehouse)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getWarehouse = await WarehouseService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(getWarehouse)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const warehouses = await WarehouseService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(warehouses)    
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