const Joi = require('joi');
const ProductCategory = require('./model');

/**
 * @export
 * @class ProductCategoryValidation
 * 
 */
class ProductCategoryValidation {
    /**
     * create an instance of ProductCategoryValidation
     * @memberof ProductCategoryValidation
     * @param {ProductCategory}
     * @returns {Joi.validationResult}
     */

    createProductCategory(body){
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
     getProductCategory(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductCategoryValidation();