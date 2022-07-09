const Joi = require('joi');
const Message = require('./model');

/**
 * @export
 * @class MessageValidation
 * 
 */
class MessageValidation {
    /**
     * create an instance of MessageValidation
     * @memberof MessageValidation
     * @param {Message}
     * @returns {Joi.validationResult}
     */

    createMessage(body){
      const schema = Joi.object().keys({
        ChatId: Joi.string().required(),
        text: Joi.string(),
        emoticon: Joi.string(),
        file: Joi.string(),
        tipeFile: Joi.string(),
        estate: Joi.string(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getMessage(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new MessageValidation();