const Joi = require('joi');
const Product = require('./model');

/**
 * @export
 * @class ProductValidation
 * 
 */
class ProductValidation {
    /**
     * create an instance of ProductValidation
     * @memberof ProductValidation
     * @param {Product}
     * @returns {Joi.validationResult}
     */

    createProduct(body){
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
     getProduct(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductValidation();