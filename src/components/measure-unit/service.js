const MeasureUnit = require('./model');
const db = require('../../config/connection/connectBD');
const MeasureUnitValidation = require('./validation');
const permissions = require('../../shared/middlewares/permissions')

sequelize = db.sequelize;

/**
 * @exports
 * @implements {MeasureUnit} model
 */
const MeasureUnitService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) {
        const MeasureUnits = await MeasureUnit.findAll()
        return MeasureUnits;
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
   * @implements {MeasureUnit} model 
   */
  async create(bearerHeader,body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) {
        const validate = MeasureUnitValidation.createMeasureUnit(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const createMeasureUnit = await MeasureUnit.create(body);
        return createMeasureUnit;
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
   * @implements {MeasureUnit} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) {
        const validate = MeasureUnitValidation.getMeasureUnit(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getMeasureUnit = await MeasureUnit.findByPk(id)
        return getMeasureUnit;
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
   * @implements {MeasureUnit} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) {
        const validate = await MeasureUnitValidation.getMeasureUnit(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const getMeasureUnit = await MeasureUnit.findByPk(id);
        
        await getMeasureUnit.destroy()
  
        return getMeasureUnit;
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
   * @description update a MeasureUnit in the db
   */
  async update(bearerHeader,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) {
        
        const validateid = await MeasureUnitValidation.getMeasureUnit(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await MeasureUnitValidation.createMeasureUnit(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
        const newMeasureUnit = await MeasureUnit.update(
          {
            name: body.name,
          },
          {where: {id}}
        )
  
        return newMeasureUnit;
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
        
        let page = 0;
        if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0 ) {
            page = pageAsNumber - 1;
        }
  
        let size = 0;
        if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
            size = sizeAsNumber;
        }
        const offset = page*size;
        const measureUnits = await MeasureUnit.findAll({
          limit: size,
          offset: offset,
        })
        return measureUnits
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

module.exports = MeasureUnitService;