const db = require('../../config/connection/connectBd');
const ThirdPartiesValidation = require('./validation');
const ThirdParties = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {ThirdParties} model
 */
const ThirdPartiesService = {
  /**
   * @exports
   * @implements {ThirdParties} model
   * @description get all ThirdPartiess 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const ThirdPartiess = await ThirdParties.findAll()
        return ThirdPartiess;
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
   * @implements {ThirdParties} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = ThirdPartiesValidation.createThirdParties(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createThirdParties = await ThirdParties.create(body);
        return createThirdParties;
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
   * @implements {ThirdParties} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = ThirdPartiesValidation.getThirdParties(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getThirdParties = await ThirdParties.findByPk(id)
        return getThirdParties;
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
   * @implements {ThirdParties} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await ThirdPartiesValidation.getThirdParties(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getThirdParties = await ThirdParties.findByPk(id);
        
        await getThirdParties.destroy()

        return getThirdParties;
        
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
   * @description update a ThirdParties in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await ThirdPartiesValidation.getThirdParties(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await ThirdPartiesValidation.createThirdParties(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newThirdParties = await ThirdParties.update(
          {
            name: body.name,
            description: body.description 
          },
          {where: {id}}
        )
  
        return newThirdParties;
        
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
        const ThirdPartiess = await Pagination('ThirdPartiess',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return ThirdPartiess
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

module.exports = ThirdPartiesService;