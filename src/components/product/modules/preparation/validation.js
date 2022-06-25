const Joi = require('joi');
const Preparation = require('./model');

/**
 * @export
 * @class PreparationValidation
 * 
 */
class PreparationValidation {
    /**
     * create an instance of PreparationValidation
     * @memberof PreparationValidation
     * @param {Preparation}
     * @returns {Joi.validationResult}
     */

    createPreparation(body){
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
     getPreparation(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new PreparationValidation();