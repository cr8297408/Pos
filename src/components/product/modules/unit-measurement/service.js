const db = require('../../../../config/connection/connectBd');
const UnitMeasurementValidation = require('./validation');
const UnitMeasurement = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');

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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_UNIT_MEASUREMENT'])
      if (validatePermission) {
        const UnitMeasurements = await UnitMeasurement.findAll()
        return new HttpResponse(200, UnitMeasurements);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {UnitMeasurement} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_UNIT_MEASUREMENT'])
      if (validatePermission) {
        const validate = UnitMeasurementValidation.createUnitMeasurement(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);

        const validateName = await ProductCategory.findOne({
          where: {
            name: body.name
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }
        
        const createUnitMeasurement = await UnitMeasurement.create({
          name: body.name,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createUnitMeasurement);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

      
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {UnitMeasurement} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_UNIT_MEASUREMENT']);
      if (validatePermission) {
        const validate = UnitMeasurementValidation.getUnitMeasurement(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getUnitMeasurement = await UnitMeasurement.findByPk(id)
        return new HttpResponse(200, getUnitMeasurement);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {UnitMeasurement} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_UNIT_MEASUREMENT']);
      if (validatePermission) {
        const validate = await UnitMeasurementValidation.getUnitMeasurement(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }

        const getUnitMeasurement = await UnitMeasurement.findByPk(id);
        
        await getUnitMeasurement.destroy()

        return new HttpResponse(200, 'unidad de medidad eliminada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message)
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
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_UNIT_MEASUREMENT'])
      if (validatePermission) {
        
        const validateid = await UnitMeasurementValidation.getUnitMeasurement(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const validateBody = await UnitMeasurementValidation.createUnitMeasurement(body)
        if (validateBody.error) {
          throw new HttpResponse(400, validate.error)
        }
        const user = await getUser(bearerHeader);

        const validateName = await UnitMeasurement.findOne({
          where: {
            name: body.name
          }
        });

        if (validateName) {
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const newUnitMeasurement = await UnitMeasurement.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'unidad de medida actualizada');
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción')

    } catch (error) {
      throw new HttpResponse(400, error.message);      
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_UNIT_MEASUREMENT'])
      if (validatePermission) {
        
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM unitMeasurements WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const unitMeasurements = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, unitMeasurements)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(error.message);
    }
  },
}

module.exports = UnitMeasurementService;