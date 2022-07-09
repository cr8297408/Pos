const MessageService = require('./service');


async function findAll(req, res, next) {
  try {
    const Messages = await MessageService.findAll(req.headers['authorization'])
    res.status(200).json(Messages)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getMessage = await MessageService.create(req.headers['authorization'],req.body);
    res.status(201).json(getMessage)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    console.log(req.params.id)
    const getMessage = await MessageService.findOne(req.headers['authorization'],req.params.id)
    res.status(200).json(getMessage)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Message = await MessageService.delete(req.headers['authorization'],req.params.id)

    res.json(Message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Message = await MessageService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.query.size);
    const pageAsNumber = Number(req.query.page);
    const where = req.body.where;
    const Messages = await MessageService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where);
    res.json(Messages)    
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