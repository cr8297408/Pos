const Joi = require('joi');
const Chat = require('./model');

/**
 * @export
 * @class ChatValidation
 * 
 */
class ChatValidation {
    /**
     * create an instance of ChatValidation
     * @memberof ChatValidation
     * @param {Chat}
     * @returns {Joi.validationResult}
     */

    createChat(body){
      const schema = Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        users: Joi.object(),
        messages: Joi.object(),
        isPrivate: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getChat(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ChatValidation();