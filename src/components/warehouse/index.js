const WarehouseService = require('./service');


async function findAll(req, res, next) {
  try {
    const Warehouses = await WarehouseService.findAll()
    res.status(200).json(Warehouses)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const Warehouse = await WarehouseService.create(req.body);
    res.status(201).json(Warehouse)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getWarehouse = await WarehouseService.findOne(req.params.id)
    res.status(200).json(getWarehouse)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getWarehouse = await WarehouseService.delete(req.params.id)

    res.json(getWarehouse)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getWarehouse = await WarehouseService.update(req.params.id, req.body)
    res.json(getWarehouse)
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