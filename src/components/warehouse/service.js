const Warehouse = require('./model');
const db = require('../../config/connection/connectBD');
const WarehouseValidation = require('./validation');
const BillingResolution = require('../billing-resolution/model');
const permissions = require('../../shared/middlewares/permissions');
const Pagination = require('../../shared/middlewares/pagination');
const HttpResponse = require('../../shared/response');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Warehouse} model
 */
const WarehouseService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ALL', 'FIND_ALL_WAREHOUSE']);
      if (validatePermission) { 
        const Warehouses = await Warehouse.findAll()
        return new HttpResponse(200, Warehouses);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch(error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {Warehouse} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, ['CREATE', 'CREATE_WAREHOUSE'])
      if (validatePermission) { 
        const validate = WarehouseValidation.createWarehouse(body);
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const idRel = body.BillingResolutionId;
  
        const validateBillingResource = await BillingResolution.findOne({
          where: {id: idRel}
        })
  
        if (!validateBillingResource) {
          throw new Error('no existe una resolucion de facturacion con id: ' + idRel)
        }
        const user = await getUser(bearerHeader);

        const validateName = await ThirdParties.findOne({
          where: {
            [Op.or]: [{name: body.name}, {code: body.code}]
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre o el codigo ya están en uso');
        }
        const createWarehouse = await Warehouse.create({
          name: body.name,
          code: body.code,
          location: body.location, 
          description: body.description,
          warehouseTypes: body.warehouseTypes,
          isActive: body.isActive,
          BillingResolutionId: body.BillingResolutionId,
          createdBy: user.id
        });
        return new HttpResponse(201, createWarehouse);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message)
    }
  },

  /**
   * @exports
   * @implements {Warehouse} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_ONE', 'FIND_ONE_WAREHOUSE']);
      if (validatePermission) { 
        const validate = WarehouseValidation.getWarehouse(id);
        if (validate.error) {
          throw new HttpResponse(validate.error);
        }
        const getWarehouse = await Warehouse.findByPk(id)
        return new HttpResponse(200, getWarehouse);
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');

    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Warehouse} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, ['DELETE', 'DELETE_WAREHOUSE']);
      if (validatePermission) { 
        const validate = await WarehouseValidation.getWarehouse(id)
  
        if (validate.error) {
          throw new HttpResponse(400, validate.error)
        }
  
        const getWarehouse = await Warehouse.findByPk(id);
        
        await getWarehouse.destroy()
  
        return new HttpResponse(200, 'deposito eliminado');
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
   * @description update a Warehouse in the db
   */
  async update(bearerHeader,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, ['UPDATE', 'UPDATE_WAREHOUSE']);
      if (validatePermission) { 
        const validateid = await WarehouseValidation.getWarehouse(id);
        
        if (validateid.error) {
          throw new HttpResponse(400, validateid.error)
        }
  
        const idRel = body.BillingResolutionId;
  
        const validateBillingResource = await BillingResolution.findOne({
          where: {id: idRel}
        })
  
        if (!validateBillingResource) {
          throw new Error('no existe una resolucion de facturacion con id: ' + idRel)
        }
        const user = await getUser(bearerHeader);
        
        const validateName = await ThirdParties.findOne({
          where: {
            [Op.or]: [{name: body.name}, {code: body.code}]
          }
        })
        if (validateName) {
          return new HttpResponse(400, 'el nombre o el codigo ya están en uso');
        }

        const newWarehouse = await Warehouse.update(
          {
            name: body.name,
            code: body.code,
            location: body.location, 
            description: body.description,
            warehouseTypes: body.warehouseTypes,
            isActive: body.isActive,
            updatedBy: user.id
          },
          {where: {id}}
        )
  
        return newWarehouse;
      } 
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },

  /**
   * @exports
   * @params  bearerHeader, sizeAsNumber, pageAsNumber,where
   * @description paginate a warehouse by size, condition and page
   */
  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,where, isActive){
    try {
      const validatePermission = await permissions(bearerHeader, ['FIND_PAGINATION', 'FIND_PAGINATION_WAREHOUSE']);
      if (validatePermission) {
        if(isActive == undefined || typeof(isActive) !== 'boolean'){
          isActive = true
        }

        let query = `SELECT * FROM warehouses WHERE name LIKE '%${wherecond}%' AND isActive = ${isActive} OR code LIKE '%${wherecond}%' AND isActive = ${isActive} OR location LIKE '%${wherecond}%' AND isActive = ${isActive} OR description LIKE '%${wherecond}%' AND isActive = ${isActive}`
        const warehouses = Pagination(sequelize,sizeAsNumber, pageAsNumber, query)
        return new HttpResponse(200, warehouses)        

      }
      return new HttpResponse(401, 'no tienes permisos para esta acción');
    } catch (error) {
      throw new HttpResponse(400, error.message);
    }
  },


}

module.exports = WarehouseService;