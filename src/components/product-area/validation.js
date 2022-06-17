const Joi = require('joi');
const ProductArea = require('./model');

/**
 * @export
 * @class ProductAreaValidation
 * 
 */
class ProductAreaValidation {
    /**
     * create an instance of ProductAreaValidation
     * @memberof ProductAreaValidation
     * @param {ProductArea}
     * @returns {Joi.validationResult}
     */

    createProductArea(body){
      const schema = Joi.object().keys({
        name: Joi.string().required().unique(),
        description: Joi.string(),
        attentionArea: Joi.boolean().required(),
        isActive: Joi.boolean()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductArea(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductAreaValidation();