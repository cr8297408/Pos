const db = require('../../../../config/connection/connectBd');
const UnitMeasurementValidation = require('./validation');
const UnitMeasurement = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {UnitMeasurement} model
 */
const UnitMeasurementService = {
  /**
   * @exports
   * @implements {UnitMeasurement} model
   * @description get all UnitMeasurements 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const UnitMeasurements = await UnitMeasurement.findAll()
        return UnitMeasurements;
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
   * @implements {UnitMeasurement} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = UnitMeasurementValidation.createUnitMeasurement(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const createUnitMeasurement = await UnitMeasurement.create({
          name: body.name,
          description: body.description,
          createdBy: user.id
        });
        return createUnitMeasurement;
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
   * @implements {UnitMeasurement} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = UnitMeasurementValidation.getUnitMeasurement(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getUnitMeasurement = await UnitMeasurement.findByPk(id)
        return getUnitMeasurement;
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
   * @implements {UnitMeasurement} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await UnitMeasurementValidation.getUnitMeasurement(id)

        if (validate.error) {
          throw new Error(validate.error)
        }

        const getUnitMeasurement = await UnitMeasurement.findByPk(id);
        
        await getUnitMeasurement.destroy()

        return getUnitMeasurement;
        
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
   * @description update a UnitMeasurement in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await UnitMeasurementValidation.getUnitMeasurement(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await UnitMeasurementValidation.createUnitMeasurement(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const user = await getUser(bearerHeader);
        const newUnitMeasurement = await UnitMeasurement.update(
          {
            name: body.name,
            description: body.description,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newUnitMeasurement;
        
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
        const UnitMeasurements = await Pagination('UnitMeasurements',sequelize,sizeAsNumber, pageAsNumber, wherecond)
        return UnitMeasurements
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

module.exports = UnitMeasurementService;