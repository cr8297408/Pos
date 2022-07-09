const db = require('../../../config/connection/connectBd');
const FileValidation = require('./validation');
const File = require('./model');
const Pagination = require('../../middlewares/pagination');
const permissions = require('../../middlewares/permissions');
const FileAwsService = require('./aws-cloud-service');
const getUser = require('../../middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {File} model
 */
const FileService = {
  /**
   * @exports
   * @implements {File} model
   * @description get all Files 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Files = await File.findAll()
        return Files;
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
   * @implements {File} model 
   */
  async create(bearerHeader, body, path, originalname) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = FileValidation.createFile(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const createFile = await File.create({
          description: body.description,
          filename: body.filename,
          url: body.url,
          key: body.key,
          bytes: body.bytes,
          storage: body.storage,
          status: body.status,
          createdBy: user.id
        });

        if(body.storage == 'AWS'){
          const uploadAws = FileAwsService.uploadFile(path, originalname)
        }
  
        return createFile;
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
   * @implements {File} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = FileValidation.getFile(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getFile = await File.findByPk(id)
        return getFile;
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
   * @param {*} id
   * @implements {File} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await FileValidation.getFile(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getFile = await File.findByPk(id);
        
        await getFile.destroy()

        return getFile;
        
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
   * @description update a File in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await FileValidation.getFile(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await FileValidation.createFile(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newFile = await File.update(
          {
            description: body.description,
            filename: body.filename,
            url: body.url,
            key: body.key,
            bytes: body.bytes,
            storage: body.storage,
            status: body.status,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newFile;
        
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
        const Files = await Pagination('Files',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Files
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

module.exports = FileService;