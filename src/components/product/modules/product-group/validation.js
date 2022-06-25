const Joi = require('joi');
const ProductGroup = require('./model');

/**
 * @export
 * @class ProductGroupValidation
 * 
 */
class ProductGroupValidation {
    /**
     * create an instance of ProductGroupValidation
     * @memberof ProductGroupValidation
     * @param {ProductGroup}
     * @returns {Joi.validationResult}
     */

    createProductGroup(body){
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
     getProductGroup(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductGroupValidation();