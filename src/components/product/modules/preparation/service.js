const db = require('../../../../config/connection/connectBd');
const PreparationValidation = require('./validation');
const Preparation = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Preparation} model
 */
const PreparationService = {
  /**
   * @exports
   * @implements {Preparation} model
   * @description get all Preparations 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const Preparations = await Preparation.findAll()
        return Preparations;
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
   * @implements {Preparation} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = PreparationValidation.createPreparation(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createPreparation = await Preparation.create(body);
        return createPreparation;
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
   * @implements {Preparation} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = PreparationValidation.getPreparation(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getPreparation = await Preparation.findByPk(id)
        return getPreparation;
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
   * @implements {Preparation} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await PreparationValidation.getPreparation(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getPreparation = await Preparation.findByPk(id);
        
        await getPreparation.destroy()

        return getPreparation;
        
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
   * @description update a Preparation in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await PreparationValidation.getPreparation(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await PreparationValidation.createPreparation(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newPreparation = await Preparation.update(
          {
            name: body.name,
            accountingAccount: body.accountingAccount 
          },
          {where: {id}}
        )
  
        return newPreparation;
        
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
        const Preparations = await Pagination('Preparations',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return Preparations
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

module.exports = PreparationService;