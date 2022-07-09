const Warehouse = require('./model');
const db = require('../../config/connection/connectBD');
const WarehouseValidation = require('./validation');
const BillingResolution = require('../billing-resolution/model');
const permissions = require('../../shared/middlewares/permissions')
const Pagination = require('../../shared/middlewares/pagination');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Warehouse} model
 */
const WarehouseService = {
  async findAll(bearerHeader){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ALL')
      if (validatePermission) { 
        const Warehouses = await Warehouse.findAll()
        return Warehouses;
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
   * @implements {Warehouse} model 
   */
  async create(bearerHeader, body) {
    try {
      const validatePermission = await permissions(bearerHeader, 'CREATE')
      if (validatePermission) { 
        const validate = WarehouseValidation.createWarehouse(body);
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const idRel = body.BillingResolutionId;
  
        const validateBillingResource = await BillingResolution.findOne({
          where: {id: idRel}
        })
  
        if (!validateBillingResource) {
          throw new Error('no existe una resolucion de facturacion con id: ' + idRel)
        }
        const user = await getUser(bearerHeader);
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
        return createWarehouse;
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
   * @implements {Warehouse} model
   */

   async findOne(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_ONE')
      if (validatePermission) { 
        const validate = WarehouseValidation.getWarehouse(id);
        if (validate.error) {
          throw new Error(validate.error)
        }
        const getWarehouse = await Warehouse.findByPk(id)
        return getWarehouse;
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
   * @implements {Warehouse} model
   */
  async delete(bearerHeader, id){
    try {
      const validatePermission = await permissions(bearerHeader, 'DELETE')
      if (validatePermission) { 
        const validate = await WarehouseValidation.getWarehouse(id)
  
        if (validate.error) {
          throw new Error(validate.error)
        }
  
        const getWarehouse = await Warehouse.findByPk(id);
        
        await getWarehouse.destroy()
  
        return getWarehouse;
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
   * @description update a Warehouse in the db
   */
  async update(bearerHeader,id, body){
    try {
      const validatePermission = await permissions(bearerHeader, 'UPDATE')
      if (validatePermission) { 
        const validateid = await WarehouseValidation.getWarehouse(id);
        
        if (validateid.error) {
          throw new Error(validate.error)
        }
  
        const validateBody = await WarehouseValidation.createWarehouse(body)
        if (validateBody.error) {
          throw new Error(validate.error)
        }
  
        const idRel = body.BillingResolutionId;
  
        const validateBillingResource = await BillingResolution.findOne({
          where: {id: idRel}
        })
  
        if (!validateBillingResource) {
          throw new Error('no existe una resolucion de facturacion con id: ' + idRel)
        }
        const user = await getUser(bearerHeader);
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
      return {
        message: 'no tienes permisos para esta acción',
        status: 401
      }
    } catch (error) {
      
    }
  },

  /**
   * @exports
   * @params  bearerHeader, sizeAsNumber, pageAsNumber,where
   * @description paginate a warehouse by size, condition and page
   */
  async findPagination(bearerHeader, sizeAsNumber, pageAsNumber,where){
    try {
      const validatePermission = await permissions(bearerHeader, 'FIND_PAGINATION')
      if (validatePermission) {
        const warehouses = await Pagination('warehouses',sequelize,sizeAsNumber, pageAsNumber,where)
        return warehouses
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

module.exports = WarehouseService;