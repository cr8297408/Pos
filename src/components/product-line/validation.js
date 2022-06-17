const Joi = require('joi');
const ProductLine = require('./model');

/**
 * @export
 * @class ProductLineValidation
 * 
 */
class ProductLineValidation {
    /**
     * create an instance of ProductLineValidation
     * @memberof ProductLineValidation
     * @param {ProductLine}
     * @returns {Joi.validationResult}
     */

    createProductLine(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
        ProductStructureId: Joi.string() 
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductLine(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductLineValidation();