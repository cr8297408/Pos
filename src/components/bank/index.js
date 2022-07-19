const BankService = require('./service');


async function findAll(req, res, next) {
  try {
    const Banks = await BankService.findAll(req.headers['authorization'])
    res.status(Banks.status).json(Banks.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getbank = await BankService.create(req.headers['authorization'],req.body);
    res.status(getbank.status).json(getbank.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const getbank = await BankService.findOne(req.headers['authorization'],req.params.id)
    res.status(getbank.status).json(getbank.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const bank = await BankService.delete(req.headers['authorization'],req.params.id)

    res.status(bank.status).json(bank.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const bank = await BankService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(bank.status).json(bank.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const banks = await BankService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(banks.status).json(banks.message)    
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