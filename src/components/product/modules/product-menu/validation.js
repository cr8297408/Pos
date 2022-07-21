const Joi = require('joi');
const ProductMenu = require('./model');

/**
 * @export
 * @class ProductMenuValidation
 * 
 */
class ProductMenuValidation {
    /**
     * create an instance of ProductMenuValidation
     * @memberof ProductMenuValidation
     * @param {ProductMenu}
     * @returns {Joi.validationResult}
     */

    createProductMenu(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        ProductId: Joi.string().required(),
        description: Joi.string(),
        products: Joi.array()
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductMenu(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductMenuValidation();