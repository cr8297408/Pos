const db = require('../../../../config/connection/connectBd');
const FiscalResponsibilityValidation = require('./validation');
const FiscalResponsibility = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {FiscalResponsibility} model
 */
const FiscalResponsibilityService = {
  /**
   * @exports
   * @implements {FiscalResponsibility} model
   * @description get all FiscalResponsibilitys 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const FiscalResponsibilitys = await FiscalResponsibility.findAll()
        return FiscalResponsibilitys;
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
   * @implements {FiscalResponsibility} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = FiscalResponsibilityValidation.createFiscalResponsibility(body);
        if (validate.error) {
          throw new Error(validate.error)
        }

        const user = getUser(bearerHeader);
  
        const createFiscalResponsibility = await FiscalResponsibility.create({
          codeDian: body.codeDian,
          taxDescription: body.taxDescription,
          createdBy: user.id
        });
        return createFiscalResponsibility;
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
   * @implements {FiscalResponsibility} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = FiscalResponsibilityValidation.getFiscalResponsibility(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getFiscalResponsibility = await FiscalResponsibility.findByPk(id)
        return getFiscalResponsibility;
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
   * @implements {FiscalResponsibility} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await FiscalResponsibilityValidation.getFiscalResponsibility(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getFiscalResponsibility = await FiscalResponsibility.findByPk(id);
        
        await getFiscalResponsibility.destroy()

        return getFiscalResponsibility;
        
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
   * @description update a FiscalResponsibility in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await FiscalResponsibilityValidation.getFiscalResponsibility(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await FiscalResponsibilityValidation.createFiscalResponsibility(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);

        const newFiscalResponsibility = await FiscalResponsibility.update(
          {
            codeDian: body.codeDian,
            taxDescription: body.taxDescription,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return newFiscalResponsibility;
        
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
        const FiscalResponsibilitys = await Pagination('FiscalResponsibilitys',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return FiscalResponsibilitys
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

module.exports = FiscalResponsibilityService;