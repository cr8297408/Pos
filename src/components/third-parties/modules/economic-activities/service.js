const db = require('../../../../config/connection/connectBd');
const EconomicActivitiesValidation = require('./validation');
const EconomicActivities = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination')
const permissions = require('../../../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {EconomicActivities} model
 */
const EconomicActivitiesService = {
  /**
   * @exports
   * @implements {EconomicActivities} model
   * @description get all EconomicActivitiess 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const EconomicActivitiess = await EconomicActivities.findAll()
        return EconomicActivitiess;
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
   * @implements {EconomicActivities} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = EconomicActivitiesValidation.createEconomicActivities(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createEconomicActivities = await EconomicActivities.create(body);
        return createEconomicActivities;
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
   * @implements {EconomicActivities} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = EconomicActivitiesValidation.getEconomicActivities(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getEconomicActivities = await EconomicActivities.findByPk(id)
        return getEconomicActivities;
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
   * @implements {EconomicActivities} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await EconomicActivitiesValidation.getEconomicActivities(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getEconomicActivities = await EconomicActivities.findByPk(id);
        
        await getEconomicActivities.destroy()

        return getEconomicActivities;
        
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
   * @description update a EconomicActivities in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await EconomicActivitiesValidation.getEconomicActivities(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await EconomicActivitiesValidation.createEconomicActivities(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newEconomicActivities = await EconomicActivities.update(
          {
            name: body.name,
            description: body.description 
          },
          {where: {id}}
        )
  
        return newEconomicActivities;
        
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
        const EconomicActivitiess = await Pagination('EconomicActivitiess',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return EconomicActivitiess
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

module.exports = EconomicActivitiesService;