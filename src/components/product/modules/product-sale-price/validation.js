const Joi = require('joi');
const ProductSalePrice = require('./model');

/**
 * @export
 * @class ProductSalePriceValidation
 * 
 */
class ProductSalePriceValidation {
    /**
     * create an instance of ProductSalePriceValidation
     * @memberof ProductSalePriceValidation
     * @param {ProductSalePrice}
     * @returns {Joi.validationResult}
     */

    createProductSalePrice(body){
      const schema = Joi.object().keys({
        ProductId: Joi.string().required(),
        GeneralValueTaxId: Joi.string().required(),
        SpecialOneValueTaxId: Joi.string(),
        SpecialTwoValueTaxId: Joi.string(),
        generalValue: Joi.number().required(),
        generalUtilityValue: Joi.number(),
        comission: Joi.number(),
        specialOneValue: Joi.number(),
        specialTwoValue: Joi.number(),
        specialTwoUtilityValue: Joi.number(),
        isActive: Joi.boolean(),
      })

      return schema.validate(body)
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
     getProductSalePrice(id) {
      const schema = Joi.string().required();

      return schema.validate(id);
  }
}
module.exports = new ProductSalePriceValidation();