const Joi = require('joi');
const UserSection = require('./model');

/**
 * @export
 * @class UserSectionValidation
 * 
 */
class UserSectionValidation {
    /**
     * create an instance of UserSectionValidation
     * @memberof UserSectionValidation
     * @param {UserSection}
     * @returns {Joi.validationResult}
     */

    createUserSection(body){
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
     getUserSection(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new UserSectionValidation();