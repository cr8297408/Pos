const Joi = require('joi');
const Tax = require('./model');

/**
 * @export
 * @class TaxValidation
 * 
 */
class TaxValidation {
    /**
     * create an instance of TaxValidation
     * @memberof TaxValidation
     * @param {Tax}
     * @returns {Joi.validationResult}
     */

    createTax(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        tax: Joi.number().required(),
        taxType: Joi.object().required(),
        isActive: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getTax(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new TaxValidation();