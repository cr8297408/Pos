const db = require('../../../../config/connection/connectBd');
const MessageValidation = require('./validation');
const Message = require('./model');
const Pagination = require('../../../middlewares/pagination')
const permissions = require('../../../middlewares/permissions')
const getUser = require('../../../middlewares/getUser');
const HttpResponse = require('../../../response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Message} model
 */
const MessageService = {
  /**
   * @exports
   * @implements {Message} model
   * @description get all Messages 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_MESSAGE'])
      if (validatePermission) {
        const Messages = await Message.findAll()
        return new HttpResponse(Messages);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Message} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_MESSAGE']);
      const user = await getUser(bearerHeader);
      if (validatePermission) {
        const validate = MessageValidation.createMessage({
          ChatId: body.ChatId,
          text: body.text,
          emoticon: body.emoticon,
          file: body.file,
          tipeFile: body.tipeFile,
          estate: body.estate,
          createdBy: user.id
        });
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createMessage = await Message.create(body);
        return new HttpResponse(201, createMessage);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {Message} model
   */

  async findOne(id){
    try {
      const Chats = await Message.findAll({
        where: {ChatId:id}
      });
      return Chats;
    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Message} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_MESSAGE'])
      if (validatePermission) {
        const validate = await MessageValidation.getMessage(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }

        const getMessage = await Message.findByPk(id);
        
        await getMessage.destroy()

        return new HttpResponse(200, 'mensaje eliminado');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a Message in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_MESSAGE'])
      if (validatePermission) {
        
        const validateid = await MessageValidation.getMessage(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }

        const user = await getUser(bearerHeader);
        const newMessage = await Message.update(
          {
            text: body.text,
            emoticon: body.emoticon,
            file: body.file,
            tipeFile: body.tipeFile,
            estate: body.estate,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newMessage;
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_MESSAGE']);
      if (validatePermission) {
        let query = `SELECT * FROM messages WHERE title LIKE '%${wherecond}%' AND isActive = ${isActive} OR subtitle LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const messages = await Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, messages);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = MessageService;