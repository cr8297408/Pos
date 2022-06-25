const Joi = require('joi');
const PreparationType = require('./model');

/**
 * @export
 * @class PreparationTypeValidation
 * 
 */
class PreparationTypeValidation {
    /**
     * create an instance of PreparationTypeValidation
     * @memberof PreparationTypeValidation
     * @param {PreparationType}
     * @returns {Joi.validationResult}
     */

    createPreparationType(body){
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
     getPreparationType(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new PreparationTypeValidation();