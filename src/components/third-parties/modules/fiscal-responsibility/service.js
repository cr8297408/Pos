const db = require('../../../../config/connection/connectBd');
const FiscalResponsibilityValidation = require('./validation');
const FiscalResponsibility = require('./model');
const Pagination = require('../../../../shared/middlewares/pagination');
const permissions = require('../../../../shared/middlewares/permissions');
const getUser = require('../../../../shared/middlewares/getUser');
const HttpResponse = require('../../../../shared/response');

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
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_FISCAL_RESPONSIBILITY']);
      if (validatePermission) {
        const FiscalResponsibilitys = await FiscalResponsibility.findAll()
        return new HttpResponse(200, FiscalResponsibilitys);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {FiscalResponsibility} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_FISCAL_RESPONSIBILITY']);
      if (validatePermission) {
        const validate = FiscalResponsibilityValidation.createFiscalResponsibility(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }

        const user = getUser(bearerHeader);
        const validateCodeDian = await ThirdParties.findOne({
          where: {
            codeDian: body.codeDian
          }
        })
        if (validateCodeDian) {
          return new HttpResponse(400, 'codigo Dian en uso');
        }
        const createFiscalResponsibility = await FiscalResponsibility.create({
          codeDian: body.codeDian,
          taxDescription: body.taxDescription,
          isActive: body.isActive,
          createdBy: user.id
        });
        return createFiscalResponsibility;
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {FiscalResponsibility} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_FISCAL_RESPONSIBILITY']);
      if (validatePermission) {
        const validate = FiscalResponsibilityValidation.getFiscalResponsibility(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }
        const getFiscalResponsibility = await FiscalResponsibility.findByPk(id)
        return new HttpResponse(200, getFiscalResponsibility);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {FiscalResponsibility} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_FISCAL_RESPONSIBILITY']);
      if (validatePermission) {
        const validate = await FiscalResponsibilityValidation.getFiscalResponsibility(id)

        if (validate.error) {
          throw new HttpResponse(400, validate.error);
        }

        const getFiscalResponsibility = await FiscalResponsibility.findByPk(id);
        
        await getFiscalResponsibility.destroy()

        return new HttpResponse(200, 'responsabilidad fiscal eliminada');
        
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
   * @description update a FiscalResponsibility in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_FISCAL_RESPONSIBILITY']);
      if (validatePermission) {
        
        const validateid = await FiscalResponsibilityValidation.getFiscalResponsibility(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validate.error);
        }
  
        const user = await getUser(bearerHeader);

        if (validateCodeDian) {
          const validateCodeDian = await ThirdParties.findOne({
            where: {
              codeDian: body.codeDian
            }
          })
          if (validateCodeDian) {
            return new HttpResponse(400, 'codigo Dian en uso');
          }
        }
        const newFiscalResponsibility = await FiscalResponsibility.update(
          {
            codeDian: body.codeDian,
            taxDescription: body.taxDescription,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return newFiscalResponsibility;
        
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM fiscalResponsibility WHERE codeDian LIKE '%${wherecond}%' AND isActive = ${isActive} OR taxDescription LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const fiscalResponsibility = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, fiscalResponsibility)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = FiscalResponsibilityService;