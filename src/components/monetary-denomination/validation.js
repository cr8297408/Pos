const Joi = require('joi');
const MonetaryDenomination = require('./model');

/**
 * @export
 * @class MonetaryDenominationValidation
 * 
 */
class MonetaryDenominationValidation {
    /**
     * create an instance of MonetaryDenominationValidation
     * @memberof MonetaryDenominationValidation
     * @param {MonetaryDenomination}
     * @returns {Joi.validationResult}
     */

    createMonetaryDenomination(body){
      const schema = Joi.object().keys({
        photoFile: Joi.string(),
        monetaryDenominationTypes: Joi.string().required(),
        value: Joi.number().required()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getMonetaryDenomination(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new MonetaryDenominationValidation();