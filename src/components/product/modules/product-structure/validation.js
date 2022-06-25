const Joi = require('joi');
const ProductStructure = require('./model');

/**
 * @export
 * @class ProductStructureValidation
 * 
 */
class ProductStructureValidation {
    /**
     * create an instance of ProductStructureValidation
     * @memberof ProductStructureValidation
     * @param {ProductStructure}
     * @returns {Joi.validationResult}
     */

    createProductStructure(body){
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        code: Joi.string().required(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductStructure(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductStructureValidation();