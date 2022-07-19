const MessageService = require('./service');


async function findAll(req, res, next) {
  try {
    const Messages = await MessageService.findAll(req.headers['authorization'])
    res.status(Messages.status).json(Messages.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getMessage = await MessageService.create(req.headers['authorization'],req.body);
    res.status(getMessage.status).json(getMessage.message)
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const getMessage = await MessageService.findOne(req.headers['authorization'],req.params.id)
    res.status(getMessage.status).json(getMessage.message)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Message = await MessageService.delete(req.headers['authorization'],req.params.id)

    res.status(Message.status).json(Message.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Message = await MessageService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Message.status).json(Message.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function findpagination(req, res){
  try {
    const sizeAsNumber = Number(req.body.size);
    const pageAsNumber = Number(req.body.page);
    const {where, isActive} = req.body;
    const Messages = await MessageService.findPagination(req.headers['authorization'],sizeAsNumber, pageAsNumber, where, isActive);
    res.status(Messages.status).json(Messages.message)    
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