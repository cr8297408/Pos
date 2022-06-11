const MonetaryDenominationService = require('./service');


async function findAll(req, res, next) {
  try {
    const MonetaryDenominations = await MonetaryDenominationService.findAll()
    res.status(200).json(MonetaryDenominations)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getMonetaryDenomination = await MonetaryDenominationService.create(req.body);
    res.status(201).json(getMonetaryDenomination)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getMonetaryDenomination = await MonetaryDenominationService.findOne(req.params.id)
    res.status(200).json(getMonetaryDenomination)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const getMonetaryDenomination = await MonetaryDenominationService.delete(req.params.id)

    res.json(getMonetaryDenomination)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const getMonetaryDenomination = await MonetaryDenominationService.update(req.params.id, req.body)
    res.json(getMonetaryDenomination)
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