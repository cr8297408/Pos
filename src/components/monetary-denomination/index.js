const MonetaryDenominationService = require('./service');


async function findAll(req, res) {
  try {
    const MonetaryDenominations = await MonetaryDenominationService.findAll(req.headers['authorization'])
    res.status(MonetaryDenominations.status).json(MonetaryDenominations.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res){
  try {
    const getMonetaryDenomination = await MonetaryDenominationService.create(req.headers['authorization'],req.body);
    res.status(getMonetaryDenomination.status).json(getMonetaryDenomination.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res){
  try {
    console.log(req.params.id)
    const getMonetaryDenomination = await MonetaryDenominationService.findOne(req.headers['authorization'],req.params.id)
    res.status(getMonetaryDenomination.status).json(getMonetaryDenomination.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res){
  try {
    const getMonetaryDenomination = await MonetaryDenominationService.delete(req.headers['authorization'],req.params.id)

    res.status(getMonetaryDenomination.status).json(getMonetaryDenomination.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getMonetaryDenomination = await MonetaryDenominationService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(getMonetaryDenomination.status).json(getMonetaryDenomination.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const MonetaryDenominations = await MonetaryDenominationService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(MonetaryDenominations.status).json(MonetaryDenominations.message)    
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