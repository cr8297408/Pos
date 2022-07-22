const Joi = require('joi');
const TaxesAndCost = require('./model');

/**
 * @export
 * @class TaxesAndCostValidation
 * 
 */
class TaxesAndCostValidation {
    /**
     * create an instance of TaxesAndCostValidation
     * @memberof TaxesAndCostValidation
     * @param {TaxesAndCost}
     * @returns {Joi.validationResult}
     */

    createTaxesAndCost(body){
      const schema = Joi.object().keys({
        ProductId: Joi.string().required(),
        ShoppingTaxId: Joi.string().required(),
        unitTaxCostId: Joi.string().required(),
        applyIco: Joi.boolean(),
        valueIco: Joi.number().required(),
        includeIcoInCost: Joi.boolean(),
        productCost: Joi.number().required(),
        unitCost: Joi.number().required(),
        isActive: Joi.boolean(),
      })

      return schema.validate(body)
    }

    /**
     * update an instance of TaxesAndCostValidation
     * @memberof TaxesAndCostValidation
     * @param {TaxesAndCost}
     * @returns {Joi.validationResult}
     */

    updateTaxesAndCost(body){
      const schema = Joi.object().keys({
        ShoppingTaxId: Joi.string(),
        unitTaxCostId: Joi.string().required(),
        applyIco: Joi.boolean(),
        valueIco: Joi.number().required(),
        includeIcoInCost: Joi.boolean(),
        productCost: Joi.number().required(),
        unitCost: Joi.number().required(),
        isActive: Joi.boolean()
      })

      return schema.validate(body)
    }


    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getTaxesAndCost(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new TaxesAndCostValidation();