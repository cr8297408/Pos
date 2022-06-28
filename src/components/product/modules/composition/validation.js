const Joi = require('joi');
const Composition = require('./model');

/**
 * @export
 * @class CompositionValidation
 * 
 */
class CompositionValidation {
    /**
     * create an instance of CompositionValidation
     * @memberof CompositionValidation
     * @param {Composition}
     * @returns {Joi.validationResult}
     */

    createComposition(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        ProductId: Joi.string().required(),
        supplies: Joi.object(),
        portion: Joi.number().required()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getComposition(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new CompositionValidation();