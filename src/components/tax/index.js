const TaxService = require('./service');


async function findAll(req, res) {
  try {
    const Taxs = await TaxService.findAll(req.headers['authorization'])
    res.status(Taxs.status).json(Taxs.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getTax = await TaxService.create(req.headers['authorization'],req.body);
    res.status(getTax.status).json(getTax.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    const getTax = await TaxService.findOne(req.headers['authorization'],req.params.id)
    res.status(getTax.status).json(getTax.message);
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getTax = await TaxService.delete(req.headers['authorization'],req.params.id)
    res.status(getTax.status).json(getTax.message)
  } catch (error) {
    res.json(error.message);
  }
}

async function updateOne(req, res){
  try {
    const getTax = await TaxService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(getTax.status).json(getTax.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const taxs = await TaxService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(taxs.status).json(taxs.message)    
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