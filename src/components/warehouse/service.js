const Warehouse = require('./model');
const db = require('../../config/connection/connectBD');
const WarehouseValidation = require('./validation');
const BillingResolution = require('../billing-resolution/model');

sequelize = db.sequelize;

/**
 * @exports
 * @implements {Warehouse} model
 */
const WarehouseService = {
  async findAll(){
    try {
      const Warehouses = await Warehouse.findAll()
      return Warehouses;
    } catch(error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @param {*} body
   * @implements {Warehouse} model 
   */
  async create(body) {
    try {
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

      const createWarehouse = await Warehouse.create(body);
      return createWarehouse;

    } catch (error) {
      throw new Error(error.message)
    }
  },

  /**
   * @exports
   * @implements {Warehouse} model
   */

   async findOne(id){
    try {
      const validate = WarehouseValidation.getWarehouse(id);
      if (validate.error) {
        throw new Error(validate.error)
      }
      const getWarehouse = await Warehouse.findByPk(id)
      return getWarehouse;


    } catch (error) {
      throw new Error(error.message)
    }
  },
  /**
   * @exports
   * @param {*} id
   * @implements {Warehouse} model
   */
  async delete(id){
    try {
      const validate = await WarehouseValidation.getWarehouse(id)

      if (validate.error) {
        throw new Error(validate.error)
      }

      const getWarehouse = await Warehouse.findByPk(id);
      
      await getWarehouse.destroy()

      return getWarehouse;
      

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
  async update(id, body){
    try {
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

      const newWarehouse = await Warehouse.update(
        {
          name: body.name,
          code: body.code,
          location: body.location, 
          description: body.description,
          warehouseTypes: body.warehouseTypes,
          isActive: body.isActive
        },
        {where: {id}}
      )

      return newWarehouse;
    } catch (error) {
      
    }
  }


}

module.exports = WarehouseService;