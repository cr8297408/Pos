const ChatService = require('./service');


async function findAll(req, res, next) {
  try {
    const Chats = await ChatService.findAll(req.headers['authorization'])
    res.status(Chats.status).json(Chats.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function create(req, res, next){
  try {
    const getChat = await ChatService.create(req.headers['authorization'],req.body);
    res.status(getChat.status).json(getChat.message);
  
  } catch (error) {
    res.json(error.message)
  }
}

async function findOne(req, res, next){
  try {
    const { id, socket } = req.params;
    const getChat = await ChatService.findOne(req.headers['authorization'], id)
    res.status(getChat.status).json(getChat.message)
  } catch (error) {
    res.json(error.message)
  }
}

async function deleteOne(req, res, next){
  try {
    const Chat = await ChatService.delete(req.headers['authorization'],req.params.id)

    res.status(Chat.status).json(Chat.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function updateOne(req, res){
  try {
    const Chat = await ChatService.update(req.headers['authorization'],req.params.id, req.body)
    res.status(Chat.status).json(Chat.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function getMessage(req, res){
  try {
    const chats = await ChatService.getMessages(req.params.id);
    res.status(chats.status).json(chats.message);
  } catch (error) {
    res.json(error.message)
  }
}

async function addPeople(req, res){
  try {
    const people = await ChatService.addPeople(req.params.id);
    res.status(people.status).json(people.message);
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