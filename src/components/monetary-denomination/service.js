const MonetaryDenomination = require('./model');
const db = require('../../config/connection/connectBD');
const MonetaryDenominationValidation = require('./validation');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const getUser = require('../../shared/middlewares/getUser');
const HttpResponse = require('../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {MonetaryDenomination} model
 */
const MonetaryDenominationService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_MONETARY_DENOMINATION'])
      if (validatePermission) {
        const MonetaryDenominations = await MonetaryDenomination.findAll()
        return new HttpResponse(200, MonetaryDenominations);  
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {MonetaryDenomination} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_MONETARY_DENOMINATION']);
      if (validatePermission) {
        const validate = MonetaryDenominationValidation.createMonetaryDenomination(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        
        const user = await getUser(bearerHeader);

        const createMonetaryDenomination = await MonetaryDenomination.create({
          photoFile: body.photoFile,
          monetaryDenominationTypes: body.monetaryDenominationTypes,
          value: body.value,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createMonetaryDenomination);
          
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {MonetaryDenomination} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_MONETARY_DENOMINATION'])
      if (validatePermission) {
        const validate = MonetaryDenominationValidation.getMonetaryDenomination(id);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
        const getMonetaryDenomination = await MonetaryDenomination.findByPk(id)
        return getMonetaryDenomination;
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {MonetaryDenomination} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_MONETARY_DENOMINATION'])
      if (validatePermission) {
        const validate = await MonetaryDenominationValidation.getMonetaryDenomination(id)
  
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const getMonetaryDenomination = await MonetaryDenomination.findByPk(id);
        
        await getMonetaryDenomination.destroy()
  
        return new HttpResponse(200, 'denominación monetaria eliminada');
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
      

    } catch (error) {
      throw new HttpResponse(400, error.message);
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
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_MONETARY_DENOMINATION']);
      if (validatePermission) {
        
        const validateid = await MonetaryDenominationValidation.getMonetaryDenomination(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const validateBody = await MonetaryDenominationValidation.createMonetaryDenomination(body)
        if (validateBody.error) {
          throw new HttpResponse(400, validateBody.error)
        }
        const user = await getUser(bearerHeader);
        const newMonetaryDenomination = await MonetaryDenomination.update(
          {
            photoFile: body.photoFile,
            value: body.value,
            monetaryDenominationTypes: body.monetaryDenominationTypes,
            isActive: body.isActive,
            updatedBy: user.id 
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'denominación monetaria actualizada');
        
      } 
      return new HttpResponse(400, 'no tienes permisos para esta acción')
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_MONETARY_DENOMINATION']);
      if (validatePermission) {
        
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM monetaryDenominations WHERE value LIKE '%${wherecond}%' AND isActive = ${isActive} OR monetaryDenominationTypes LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const monetaryDenominations = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, monetaryDenominations)
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
        throw new HttpResponse(400, error.message);
    }
  },
}

module.exports = MonetaryDenominationService;