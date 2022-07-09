const db = require('../../../../config/connection/connectBd');
const MessageValidation = require('./validation');
const Message = require('./model');
const Pagination = require('../../../middlewares/pagination')
const permissions = require('../../../middlewares/permissions')
const getUser = require('../../../middlewares/getUser')

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
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Messages = await Message.findAll()
        return Messages;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch(error) {
      throw new Error(error.message)
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {Message} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE');
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
        return createMessage;
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
      
    } catch (error) {
      throw new Error(error.message)
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
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await MessageValidation.getMessage(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getMessage = await Message.findByPk(id);
        
        await getMessage.destroy()

        return getMessage;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      throw new Error(error)
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
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await MessageValidation.getMessage(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await MessageValidation.createMessage(body)
        if (validateBody.error) {
          throw new Error(validate.error)
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
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const Messages = await Pagination('Messages',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Messages
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
        throw new Error(error.message);
    }
  },
}

module.exports = MessageService;