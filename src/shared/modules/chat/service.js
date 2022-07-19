const db = require('../../../config/connection/connectBd');
const ChatValidation = require('./validation');
const Chat = require('./model');
const Message = require('./message/model');
const permissions = require('../../middlewares/permissions');
const getUser = require('../../middlewares/getUser');
const HttpResponse = require('../../response');

const io = require('../../../config/socket.io');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Chat} model
 */
const ChatService = {
  /**
   * @exports
   * @implements {Chat} model
   * @description get all Chats 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_CHAT'])
      if (validatePermission) {
        const Chats = await Chat.findAll();
        return new HttpResponse(200, Chats);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Chat} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_CHAT'])
      if (validatePermission) {
        const validate = ChatValidation.createChat(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);
        const createChat = await Chat.create({
          name: body.name,
          description: body.description,
          users: body.users,
          messages: body.messages,
          isPrivate: body.isPrivate,
          createdBy: user.id
        });
        // io.emit('new-room', body)
        return new HttpResponse(201, createChat);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {Chat} model
   */

  async findOne(bearerHeader, id, socket){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_CHAT'])
      if (validatePermission) {
        const validate = ChatValidation.getChat(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getChat = await Chat.findByPk(id)
        return new HttpResponse(200, getChat);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Chat} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_CHAT'])
      if (validatePermission) {
        const validate = await ChatValidation.getChat(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getChat = await Chat.findByPk(id);
        
        await getChat.destroy()
        
        // io.in(getChat.name).socketsLeave(getChat.name);
        // io.emit('delete-room', id)

        return new HttpResponse(200, 'chat eliminado');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Chat in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_CHAT'])
      if (validatePermission) {
        
        const validateid = await ChatValidation.getChat(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        // const validateBody = await ChatValidation.createChat(body)
        // if (validateBody.error) {
        //   throw new Error(validateBody.error)
        // }
        const user = await getUser(bearerHeader);
        const newChat = await Chat.update(
          {
            name: body.name,
            description: body.description,
            users: body.users,
            messages: body.messages,
            isPrivate: body.isPrivate,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'chat actualizado');

      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description get all messages of one chat
   */
  async getMessages(id){
    try {
      const Chats = await Message.findAll();
      return new HttpResponse(200, Chats);
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description get all messages of one chat
   */
  async addPeople(id,body){
    try {
      
      const chat = await Chat.findByPk(id);

      const users = chat.users;

      for (let i = 0; i < body.length; i++) {
        users.body[i] = body[i] 
      }

      console.log(users);
      return new HttpResponse(200, `usuarios en el chat: ${users}`)
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  }
}

module.exports = ChatService;