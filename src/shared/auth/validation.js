const Joi = require('joi');
const Auth = require('./model');

/**
 * @export
 * @class AuthValidation
 * 
 */
class AuthValidation {
    /**
     * create an instance of AuthValidation
     * @memberof AuthValidation
     * @param {Auth}
     * @returns {Joi.validationResult}
     */

    createAuth(body){
      const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        lastname: Joi.string(),
        firstname: Joi.string().required(),
        username: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getAuth(email, password) {
      const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      })


      return schema.validate(id);
  }
}
module.exports = new AuthValidation();