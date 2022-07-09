const Joi = require('joi');
const ThirdParties = require('./model');

/**
 * @export
 * @class ThirdPartiesValidation
 * 
 */
class ThirdPartiesValidation {
    /**
     * create an instance of ThirdPartiesValidation
     * @memberof ThirdPartiesValidation
     * @param {ThirdParties}
     * @returns {Joi.validationResult}
     */

    createThirdParties(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getThirdParties(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ThirdPartiesValidation();