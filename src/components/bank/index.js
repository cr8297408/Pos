const BankService = require('./service');


async function findAll(req, res, next) {
  try {
    const Banks = await BankService.findAll()
    res.status(200).json(Banks)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getbank = await BankService.create(req.body);
    res.status(201).json(getbank)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getbank = await BankService.findOne(req.params.id)
    res.status(200).json(getbank)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const bank = await BankService.delete(req.params.id)

    res.json(bank)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const bank = await BankService.update(req.params.id, req.body)
    res.json(bank)
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