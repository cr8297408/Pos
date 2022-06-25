const db = require('../../../../config/connection/connectBd');
const PreparationTypeValidation = require('./validation');
const PreparationType = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {PreparationType} model
 */
const PreparationTypeService = {
  /**
   * @exports
   * @implements {PreparationType} model
   * @description get all PreparationTypes 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const PreparationTypes = await PreparationType.findAll()
        return PreparationTypes;
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
   * @implements {PreparationType} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = PreparationTypeValidation.createPreparationType(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createPreparationType = await PreparationType.create(body);
        return createPreparationType;
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
   * @implements {PreparationType} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = PreparationTypeValidation.getPreparationType(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getPreparationType = await PreparationType.findByPk(id)
        return getPreparationType;
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
   * @implements {PreparationType} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await PreparationTypeValidation.getPreparationType(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getPreparationType = await PreparationType.findByPk(id);
        
        await getPreparationType.destroy()

        return getPreparationType;
        
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
   * @description update a PreparationType in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await PreparationTypeValidation.getPreparationType(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await PreparationTypeValidation.createPreparationType(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newPreparationType = await PreparationType.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newPreparationType;
        
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
        const PreparationTypes = await Pagination('PreparationTypes',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return PreparationTypes
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

module.exports = PreparationTypeService;