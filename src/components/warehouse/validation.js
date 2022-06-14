const Joi = require('joi');
const Warehouse = require('./model');

/**
 * @export
 * @class WarehouseValidation
 * 
 */
class WarehouseValidation {
    /**
     * create an instance of WarehouseValidation
     * @memberof WarehouseValidation
     * @param {Warehouse}
     * @returns {Joi.validationResult}
     */

    createWarehouse(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.number().required(),
        location: Joi.string().required(),
        description: Joi.string(),
        warehouseTypes: Joi.string().required(),
        isActive: Joi.boolean(),
        BillingResolutionId: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getWarehouse(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new WarehouseValidation();