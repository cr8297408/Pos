const MeasureUnit = require('./model');
const db = require('../../config/connection/connectBD');
const MeasureUnitValidation = require('./validation');
const permissions = require('../../shared/middlewares/permissions');
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {MeasureUnit} model
 */
const MeasureUnitService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_MEASURE_UNIT'])
      if (validatePermission) {
        const MeasureUnits = await MeasureUnit.findAll()
        return new HttpResponse(200, MeasureUnits);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {MeasureUnit} model 
   */
  async create(bearerHeader,body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_MEASURE_UNIT'])
      if (validatePermission) {
        const validate = MeasureUnitValidation.createMeasureUnit(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const user = await getUser(bearerHeader);

        const validateName = await MeasureUnit.findOne({
          where: {
            name: body.name
          }
        });

        if(validateName){
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const createMeasureUnit = await MeasureUnit.create({
          name: body.name,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createMeasureUnit);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {MeasureUnit} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_MEASURE_UNIT'])
      if (validatePermission) {
        const validate = MeasureUnitValidation.getMeasureUnit(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getMeasureUnit = await MeasureUnit.findByPk(id)
        return new HttpResponse(200, getMeasureUnit);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {MeasureUnit} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_MEASURE_UNIT'])
      if (validatePermission) {
        const validate = await MeasureUnitValidation.getMeasureUnit(id)
  
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const getMeasureUnit = await MeasureUnit.findByPk(id);
        
        await getMeasureUnit.destroy()
  
        return new HttpResponse(200, 'unidad de medida eliminada');;
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a MeasureUnit in the db
   */
  async update(bearerHeader,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_MEASURE_UNIT'])
      if (validatePermission) {
        
        const validateid = await MeasureUnitValidation.getMeasureUnit(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const user = await getUser(bearerHeader);
        const validateName = await MeasureUnit.findOne({
          where: {
            name: body.name
          }
        });

        if(validateName){
          return new HttpResponse(400, 'el nombre ya está en uso');
        }

        const newMeasureUnit = await MeasureUnit.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'unidad de medida actualizada');;
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400,error.message);
    }
  },
  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_MEASURE_UNIT'])
      if (validatePermission) {
        
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM unitMeasurements WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive}`

        const getUnitMeasurements = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, getUnitMeasurements)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },

}

module.exports = MeasureUnitService;