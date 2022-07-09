const ChatService = require('./service');


async function findAll(req, res, next) {
  try {
    const Chats = await ChatService.findAll(req.headers['authorization'])
    res.status(200).json(Chats)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getChat = await ChatService.create(req.headers['authorization'],req.body);
    res.status(201).json(getChat);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const { id, socket } = req.params;
    const getChat = await ChatService.findOne(req.headers['authorization'], id)
    res.status(200).json(getChat)
  } catch (error) {
    res.status(404).json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Chat = await ChatService.delete(req.headers['authorization'],req.params.id)

    res.json(Chat)
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Chat = await ChatService.update(req.headers['authorization'],req.params.id, req.body)
    res.json(Chat)
  } catch (error) {
    res.json(error.message)
  }
}

async function getMessage(req, res){
  try {
    const chats = await ChatService.getMessages(req.params.id);
    res.json(chats)
  } catch (error) {
    res.json(error.message)
  }
}

async function addPeople(req, res){
  try {
    const people = await ChatService.addPeople(req.params.id);
    res.json(people)
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
  getMessage,
  addPeople
}