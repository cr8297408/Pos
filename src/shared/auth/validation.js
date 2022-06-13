const Joi = require('joi');

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
        email: Joi.string().email({ 
          minDomainSegments: 2,
        }).required(),
        password: Joi.string().required(),
        lastName: Joi.string(),
        firstName: Joi.string().required(),
        username: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getAuth(body) {
      const schema = Joi.object().keys({
        email: Joi.string().email({ 
          minDomainSegments: 2,
        }).required(),
        password: Joi.string().required(),
      })


      return schema.validate(body);
  }
}
module.exports = new AuthValidation();