const MonetaryDenomination = require('./model');
const db = require('../../config/connection/connectBD');
const MonetaryDenominationValidation = require('./validation');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
sequelize = db.sequelize;

/**
 * @exports
 * @implements {MonetaryDenomination} model
 */
const MonetaryDenominationService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const MonetaryDenominations = await MonetaryDenomination.findAll()
        return MonetaryDenominations;  
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
   * @implements {MonetaryDenomination} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = MonetaryDenominationValidation.createMonetaryDenomination(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createMonetaryDenomination = await MonetaryDenomination.create(body);
        return createMonetaryDenomination;
          
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
   * @implements {MonetaryDenomination} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = MonetaryDenominationValidation.getMonetaryDenomination(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getMonetaryDenomination = await MonetaryDenomination.findByPk(id)
        return getMonetaryDenomination;
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
   * @implements {MonetaryDenomination} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await MonetaryDenominationValidation.getMonetaryDenomination(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const getMonetaryDenomination = await MonetaryDenomination.findByPk(id);
        
        await getMonetaryDenomination.destroy()
  
        return getMonetaryDenomination;
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
   * @description update a MonetaryDenomination in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await MonetaryDenominationValidation.getMonetaryDenomination(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await MonetaryDenominationValidation.createMonetaryDenomination(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newMonetaryDenomination = await MonetaryDenomination.update(
          {
            photoFile: body.photoFile,
            value: body.value,
            monetaryDenominationTypes: body.monetaryDenominationTypes 
          },
          {where: {id}}
        )
  
        return newMonetaryDenomination;
        
      } 
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },
  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,where){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const monetaryDenominations = await Pagination('monetaryDenominations',sequelize,sizeAsNumber, pageAsNumber,where)
        return monetaryDenominations
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

module.exports = MonetaryDenominationService;