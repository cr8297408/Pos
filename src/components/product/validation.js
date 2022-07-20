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
        description: Joi.string(),
        code:Joi.string().required(),
        ref:Joi.string(),
        subGroups:Joi.string(),
        barCode:Joi.string(),
        barCodeGroup:Joi.string(),
        ProductStructureId:Joi.string(),
        ProductLineId:Joi.string().required(),
        UnitMeasurementId:Joi.string(),
        ProductAreaId:Joi.string(),
        ProductGroupId:Joi.string(),
        FileId:Joi.string(),
        shoppingAssistant:Joi.boolean(),
        isProductCurve:Joi.boolean(),
        compound:Joi.boolean(),
        isActive:Joi.boolean(),
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