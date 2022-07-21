const db = require('../../config/connection/connectBd');
const TaxesAndCostValidation = require('./validation');
const TaxesAndCost = require('./model');
const Pagination = require('../../shared/middlewares/pagination')
const permissions = require('../../shared/middlewares/permissions');
const HttpResponse = require('../../shared/response');
const getUser = require('../../shared/middlewares/getUser');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {TaxesAndCost} model
 */
const TaxesAndCostService = {
  /**
   * @exports
   * @implements {TaxesAndCost} model
   * @description get all TaxesAndCosts 
   */
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_TaxesAndCost'])
      if (validatePermission) {
        const TaxesAndCosts = await TaxesAndCost.findAll()
        return new HttpResponse(200, TaxesAndCosts);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch(error) {
      return new HttpResponse(400, error.message);
    }
  },

  
  /**
   * @exports
   * @param {*} body
   * @implements {TaxesAndCost} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_TaxesAndCost'])
      if (validatePermission) {
        const validate = TaxesAndCostValidation.createTaxesAndCost(body);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const user = await getUser(bearerHeader);

        const existsTaxesAndCost = await TaxesAndCost.findOne({
          where: {
            name: body.name
          }
        })
        if(existsTaxesAndCost){
          return new HttpResponse(400, 'el nombre de TaxesAndCost ya está en uso')
        }
        
        const createTaxesAndCost = await TaxesAndCost.create({
          name: body.name,
          description: body.description,
          isActive: body.isActive,
          createdBy: user.id
        });
        return new HttpResponse(201, createTaxesAndCost);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
      
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @implements {TaxesAndCost} model
   */

  async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_TaxesAndCost'])
      if (validatePermission) {
        const validate = TaxesAndCostValidation.getTaxesAndCost(id);
        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }
        const getTaxesAndCost = await TaxesAndCost.findByPk(id);
        return new HttpResponse(200, getTaxesAndCost);
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {TaxesAndCost} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_TaxesAndCost'])
      if (validatePermission) {
        const validate = await TaxesAndCostValidation.getTaxesAndCost(id)

        if (validate.error) {
          return new HttpResponse(400, validate.error);
        }

        const param = await TaxesAndCost.findByPk(id);

        await param.destroy();
  
        return new HttpResponse(200, 'TaxesAndCost eliminado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} id 
   * @param {*} body 
   * @description update a TaxesAndCost in the db
   */
  async update(bearerHeader, id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_TaxesAndCost'])
      if (validatePermission) {
        
        const validateid = await TaxesAndCostValidation.getTaxesAndCost(id);
        
        if (validateid.error) {
          return new HttpResponse(400, validateid.error)
        }
        
        if(body.name){
          const existsTaxesAndCost = await TaxesAndCost.findOne({
            where: {
              name: body.name
            }
          })
          if(existsTaxesAndCost){
            return new HttpResponse(400, 'el nombre ya está en uso')
          }
        }
        const user = await getUser(bearerHeader)

        const newTaxesAndCost = await TaxesAndCost.update(
          {
            name: body.name,
            description: body.description,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return new HttpResponse(200, 'usuario modificado');
        
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },

  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber, wherecond, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_TaxesAndCost'])
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM TaxesAndCosts WHERE ProductId LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const TaxesAndCosts = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, TaxesAndCosts)
      } 
      const err = new HttpResponse(401, 'no tienes permisos para esta acción');
      return err;
    } catch (error) {
      return new HttpResponse(400, error.message);
    }
  },
}

module.exports = TaxesAndCostService;