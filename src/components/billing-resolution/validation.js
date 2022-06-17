const Joi = require('joi');
const BillingResolution = require('./model');

/**
 * @export
 * @class BillingResolutionValidation
 * 
 */
class BillingResolutionValidation {
    /**
     * create an instance of BillingResolutionValidation
     * @memberof BillingResolutionValidation
     * @param {BillingResolution}
     * @returns {Joi.validationResult}
     */

    createBillingResolution(body){
      const schema = Joi.object().keys({
        resolutionClass: Joi.string().required(),
        resolutionType: Joi.string().required(),
        resolutionNumber: Joi.number().required().unique(),
        from: Joi.date(),
        to: Joi.date(),
        prefix: Joi.string().required().unique(),
        initialNumber: Joi.number().required(),
        finalNumber: Joi.number().required(),
        localBilling: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getBillingResolution(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new BillingResolutionValidation();