const WarehouseService = require('./service');


async function findAll(req, res) {
  try {
    const Warehouses = await WarehouseService.findAll(req.headers['authorization'])
    res.status(Warehouses.status).json(Warehouses.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const Warehouse = await WarehouseService.create(req.headers['authorization'],req.body);
    res.status(Warehouse.status).json(Warehouse.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getWarehouse = await WarehouseService.findOne(req.headers['authorization'],req.params.id)
    res.status(getWarehouse.status).json(getWarehouse.message);
  } catch (error) {
    res.json(error.message);
  }
}

async function deleteOne(req, res){
  try {
    const getWarehouse = await WarehouseService.delete(req.headers['authorization'],req.params.id)

    res.status(getWarehouse.status).json(getWarehouse.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getWarehouse = await WarehouseService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(getWarehouse.status).json(getWarehouse.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const warehouses = await WarehouseService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(warehouses.status).json(warehouses.message);    
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