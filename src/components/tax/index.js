const TaxService = require('./service');


async function findAll(req, res, next) {
  try {
    const Taxs = await TaxService.findAll()
    res.status(200).json(Taxs)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getTax = await TaxService.create(req.body);
    res.status(201).json(getTax)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getTax = await TaxService.findOne(req.params.id)
    res.status(200).json(getTax)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getTax = await TaxService.delete(req.params.id)

    res.json(getTax)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getTax = await TaxService.update(req.params.id, req.body)
    res.json(getTax)
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