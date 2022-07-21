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
        name: Joi.string().required(),
        description: Joi.string().required(),
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