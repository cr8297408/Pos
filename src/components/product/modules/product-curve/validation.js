const Joi = require('joi');
const ProductCurve = require('./model');

/**
 * @export
 * @class ProductCurveValidation
 * 
 */
class ProductCurveValidation {
    /**
     * create an instance of ProductCurveValidation
     * @memberof ProductCurveValidation
     * @param {ProductCurve}
     * @returns {Joi.validationResult}
     */

    createProductCurve(body){
      const schema = Joi.object().keys({
        ProductId: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        code: Joi.string(),
        ref: Joi.string(),
        isActive: Joi.boolean(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductCurve(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductCurveValidation();