const Joi = require('joi');
const FiscalResponsibility = require('./model');

/**
 * @export
 * @class FiscalResponsibilityValidation
 * 
 */
class FiscalResponsibilityValidation {
    /**
     * create an instance of FiscalResponsibilityValidation
     * @memberof FiscalResponsibilityValidation
     * @param {FiscalResponsibility}
     * @returns {Joi.validationResult}
     */

    createFiscalResponsibility(body){
      const schema = Joi.object().keys({
        codeDian: Joi.string().required(),
        taxDescription: Joi.string(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getFiscalResponsibility(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new FiscalResponsibilityValidation();